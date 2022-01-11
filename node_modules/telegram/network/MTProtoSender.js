"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MTProtoSender = void 0;
/**
 * MTProto Mobile Protocol sender
 * (https://core.telegram.org/mtproto/description)
 * This class is responsible for wrapping requests into `TLMessage`'s,
 * sending them over the network and receiving them in a safe manner.
 *
 * Automatic reconnection due to temporary network issues is a concern
 * for this class as well, including retry of messages that could not
 * be sent successfully.
 *
 * A new authorization key will be generated on connection if no other
 * key exists yet.
 */
const AuthKey_1 = require("../crypto/AuthKey");
const MTProtoState_1 = require("./MTProtoState");
const extensions_1 = require("../extensions");
const extensions_2 = require("../extensions");
const core_1 = require("../tl/core");
const tl_1 = require("../tl");
const big_integer_1 = __importDefault(require("big-integer"));
const Helpers_1 = require("../Helpers");
const RequestState_1 = require("./RequestState");
const Authenticator_1 = require("./Authenticator");
const MTProtoPlainSender_1 = require("./MTProtoPlainSender");
const errors_1 = require("../errors");
const _1 = require("./");
class MTProtoSender {
    /**
     * @param authKey
     * @param opts
     */
    constructor(authKey, opts) {
        const args = Object.assign(Object.assign({}, MTProtoSender.DEFAULT_OPTIONS), opts);
        this._connection = undefined;
        this._log = args.logger;
        this._dcId = args.dcId;
        this._retries = args.retries;
        this._delay = args.delay;
        this._autoReconnect = args.autoReconnect;
        this._connectTimeout = args.connectTimeout;
        this._authKeyCallback = args.authKeyCallback;
        this._updateCallback = args.updateCallback;
        this._autoReconnectCallback = args.autoReconnectCallback;
        this._isMainSender = args.isMainSender;
        this._senderCallback = args.senderCallback;
        this._client = args.client;
        this._onConnectionBreak = args.onConnectionBreak;
        /**
         * whether we disconnected ourself or telegram did it.
         */
        this.userDisconnected = false;
        /**
         * If a disconnection happens for any other reason and it
         * was *not* user action then the pending messages won't
         * be cleared but on explicit user disconnection all the
         * pending futures should be cancelled.
         */
        this.isConnecting = false;
        this._authenticated = false;
        this._userConnected = false;
        this._reconnecting = false;
        this._disconnected = true;
        /**
         * We need to join the loops upon disconnection
         */
        this._sendLoopHandle = null;
        this._recvLoopHandle = null;
        /**
         * Preserving the references of the AuthKey and state is important
         */
        this.authKey = authKey || new AuthKey_1.AuthKey();
        this._state = new MTProtoState_1.MTProtoState(this.authKey, this._log);
        /**
         * Outgoing messages are put in a queue and sent in a batch.
         * Note that here we're also storing their ``_RequestState``.
         */
        this._sendQueue = new extensions_2.MessagePacker(this._state, this._log);
        /**
         * Sent states are remembered until a response is received.
         */
        this._pendingState = new Map();
        /**
         * Responses must be acknowledged, and we can also batch these.
         */
        this._pendingAck = new Set();
        /**
         * Similar to pending_messages but only for the last acknowledges.
         * These can't go in pending_messages because no acknowledge for them
         * is received, but we may still need to resend their state on bad salts.
         */
        this._lastAcks = [];
        /**
         * Jump table from response ID to method that handles it
         */
        this._handlers = {
            [core_1.RPCResult.CONSTRUCTOR_ID.toString()]: this._handleRPCResult.bind(this),
            [core_1.MessageContainer.CONSTRUCTOR_ID.toString()]: this._handleContainer.bind(this),
            [core_1.GZIPPacked.CONSTRUCTOR_ID.toString()]: this._handleGzipPacked.bind(this),
            [tl_1.Api.Pong.CONSTRUCTOR_ID.toString()]: this._handlePong.bind(this),
            [tl_1.Api.BadServerSalt.CONSTRUCTOR_ID.toString()]: this._handleBadServerSalt.bind(this),
            [tl_1.Api.BadMsgNotification.CONSTRUCTOR_ID.toString()]: this._handleBadNotification.bind(this),
            [tl_1.Api.MsgDetailedInfo.CONSTRUCTOR_ID.toString()]: this._handleDetailedInfo.bind(this),
            [tl_1.Api.MsgNewDetailedInfo.CONSTRUCTOR_ID.toString()]: this._handleNewDetailedInfo.bind(this),
            [tl_1.Api.NewSessionCreated.CONSTRUCTOR_ID.toString()]: this._handleNewSessionCreated.bind(this),
            [tl_1.Api.MsgsAck.CONSTRUCTOR_ID.toString()]: this._handleAck.bind(this),
            [tl_1.Api.FutureSalts.CONSTRUCTOR_ID.toString()]: this._handleFutureSalts.bind(this),
            [tl_1.Api.MsgsStateReq.CONSTRUCTOR_ID.toString()]: this._handleStateForgotten.bind(this),
            [tl_1.Api.MsgResendReq.CONSTRUCTOR_ID.toString()]: this._handleStateForgotten.bind(this),
            [tl_1.Api.MsgsAllInfo.CONSTRUCTOR_ID.toString()]: this._handleMsgAll.bind(this),
        };
    }
    set dcId(dcId) {
        this._dcId = dcId;
    }
    get dcId() {
        return this._dcId;
    }
    // Public API
    /**
     * Connects to the specified given connection using the given auth key.
     */
    async connect(connection, force) {
        if (this._userConnected && !force) {
            this._log.info("User is already connected!");
            return false;
        }
        this.isConnecting = true;
        this._connection = connection;
        for (let attempt = 0; attempt < this._retries; attempt++) {
            try {
                await this._connect();
                if (this._updateCallback) {
                    this._updateCallback(this._client, new _1.UpdateConnectionState(_1.UpdateConnectionState.connected));
                }
                break;
            }
            catch (err) {
                if (this._updateCallback && attempt === 0) {
                    this._updateCallback(this._client, new _1.UpdateConnectionState(_1.UpdateConnectionState.disconnected));
                }
                this._log.error(`WebSocket connection failed attempt: ${attempt + 1}`);
                if (this._log.canSend("error")) {
                    console.error(err);
                }
                await Helpers_1.sleep(this._delay);
            }
        }
        this.isConnecting = false;
        return true;
    }
    isConnected() {
        return this._userConnected;
    }
    /**
     * Cleanly disconnects the instance from the network, cancels
     * all pending requests, and closes the send and receive loops.
     */
    async disconnect() {
        this.userDisconnected = true;
        await this._disconnect();
    }
    /**
     *
     This method enqueues the given request to be sent. Its send
     state will be saved until a response arrives, and a ``Future``
     that will be resolved when the response arrives will be returned:

     .. code-block:: javascript

     async def method():
     # Sending (enqueued for the send loop)
     future = sender.send(request)
     # Receiving (waits for the receive loop to read the result)
     result = await future

     Designed like this because Telegram may send the response at
     any point, and it can send other items while one waits for it.
     Once the response for this future arrives, it is set with the
     received result, quite similar to how a ``receive()`` call
     would otherwise work.

     Since the receiving part is "built in" the future, it's
     impossible to await receive a result that was never sent.
     * @param request
     * @returns {RequestState}
     */
    send(request) {
        if (!this._userConnected) {
            throw new Error("Cannot send requests while disconnected. You need to call .connect()");
        }
        const state = new RequestState_1.RequestState(request);
        this._sendQueue.append(state);
        return state.promise;
    }
    /**
     * Performs the actual connection, retrying, generating the
     * authorization key if necessary, and starting the send and
     * receive loops.
     * @returns {Promise<void>}
     * @private
     */
    async _connect() {
        this._log.info("Connecting to {0}...".replace("{0}", this._connection.toString()));
        await this._connection.connect();
        this._log.debug("Connection success!");
        if (!this.authKey.getKey()) {
            const plain = new MTProtoPlainSender_1.MTProtoPlainSender(this._connection, this._log);
            this._log.debug("New auth_key attempt ...");
            const res = await Authenticator_1.doAuthentication(plain, this._log);
            this._log.debug("Generated new auth_key successfully");
            await this.authKey.setKey(res.authKey);
            this._state.timeOffset = res.timeOffset;
            /**
             * This is *EXTREMELY* important since we don't control
             * external references to the authorization key, we must
             * notify whenever we change it. This is crucial when we
             * switch to different data centers.
             */
            if (this._authKeyCallback) {
                await this._authKeyCallback(this.authKey, this._dcId);
            }
        }
        else {
            this._authenticated = true;
            this._log.debug("Already have an auth key ...");
        }
        this._userConnected = true;
        this._reconnecting = false;
        this._log.debug("Starting receive loop");
        this._recvLoopHandle = this._recvLoop();
        this._log.debug("Starting send loop");
        this._sendLoopHandle = this._sendLoop();
        // _disconnected only completes after manual disconnection
        // or errors after which the sender cannot continue such
        // as failing to reconnect or any unexpected error.
        this._log.info("Connection to %s complete!".replace("%s", this._connection.toString()));
    }
    async _disconnect(error = null) {
        this._sendQueue.rejectAll();
        if (this._connection === null) {
            this._log.info("Not disconnecting (already have no connection)");
            return;
        }
        if (this._updateCallback) {
            this._updateCallback(this._client, new _1.UpdateConnectionState(_1.UpdateConnectionState.disconnected));
        }
        this._log.info("Disconnecting from %s...".replace("%s", this._connection.toString()));
        this._userConnected = false;
        this._log.debug("Closing current connection...");
        await this._connection.disconnect();
    }
    /**
     * This loop is responsible for popping items off the send
     * queue, encrypting them, and sending them over the network.
     * Besides `connect`, only this method ever sends data.
     * @returns {Promise<void>}
     * @private
     */
    async _sendLoop() {
        this._sendQueue = new extensions_2.MessagePacker(this._state, this._log);
        while (this._userConnected && !this._reconnecting) {
            if (this._pendingAck.size) {
                const ack = new RequestState_1.RequestState(new tl_1.Api.MsgsAck({ msgIds: Array(...this._pendingAck) }));
                this._sendQueue.append(ack);
                this._lastAcks.push(ack);
                if (this._lastAcks.length >= 10) {
                    this._lastAcks.shift();
                }
                this._pendingAck.clear();
            }
            this._log.debug("Waiting for messages to send..." + this._reconnecting);
            // TODO Wait for the connection send queue to be empty?
            // This means that while it's not empty we can wait for
            // more messages to be added to the send queue.
            const res = await this._sendQueue.get();
            if (this._reconnecting) {
                this._log.debug("Reconnecting. will stop loop");
                return;
            }
            if (!res) {
                this._log.debug("Empty result. will not stop loop");
                continue;
            }
            let { data } = res;
            const { batch } = res;
            this._log.debug(`Encrypting ${batch.length} message(s) in ${data.length} bytes for sending`);
            data = await this._state.encryptMessageData(data);
            try {
                await this._connection.send(data);
            }
            catch (e) {
                this._log.error(e);
                this._log.info("Connection closed while sending data");
                return;
            }
            for (const state of batch) {
                if (!Array.isArray(state)) {
                    if (state.request.classType === "request") {
                        this._pendingState.set(state.msgId.toString(), state);
                    }
                }
                else {
                    for (const s of state) {
                        if (s.request.classType === "request") {
                            this._pendingState.set(s.msgId.toString(), s);
                        }
                    }
                }
            }
            this._log.debug("Encrypted messages put in a queue to be sent");
        }
    }
    async _recvLoop() {
        let body;
        let message;
        while (this._userConnected && !this._reconnecting) {
            // this._log.debug('Receiving items from the network...');
            this._log.debug("Receiving items from the network...");
            try {
                body = await this._connection.recv();
            }
            catch (e) {
                /** when the server disconnects us we want to reconnect */
                if (!this.userDisconnected) {
                    this._log.error(e);
                    this._log.warn("Connection closed while receiving data");
                    this.reconnect();
                }
                return;
            }
            try {
                message = await this._state.decryptMessageData(body);
            }
            catch (e) {
                if (e instanceof errors_1.TypeNotFoundError) {
                    // Received object which we don't know how to deserialize
                    this._log.info(`Type ${e.invalidConstructorId} not found, remaining data ${e.remaining}`);
                    continue;
                }
                else if (e instanceof errors_1.SecurityError) {
                    // A step while decoding had the incorrect data. This message
                    // should not be considered safe and it should be ignored.
                    this._log.warn(`Security error while unpacking a received message: ${e}`);
                    continue;
                }
                else if (e instanceof errors_1.InvalidBufferError) {
                    // 404 means that the server has "forgotten" our auth key and we need to create a new one.
                    if (e.code === 404) {
                        this._log.warn(`Broken authorization key for dc ${this._dcId}; resetting`);
                        if (this._updateCallback && this._isMainSender) {
                            this._updateCallback(this._client, new _1.UpdateConnectionState(_1.UpdateConnectionState.broken));
                        }
                        else if (this._onConnectionBreak &&
                            !this._isMainSender) {
                            // Deletes the current sender from the object
                            this._onConnectionBreak(this._dcId);
                        }
                    }
                    else {
                        // this happens sometimes when telegram is having some internal issues.
                        // reconnecting should be enough usually
                        // since the data we sent and received is probably wrong now.
                        this._log.warn(`Invalid buffer ${e.code} for dc ${this._dcId}`);
                        this.reconnect();
                    }
                    return;
                }
                else {
                    this._log.error("Unhandled error while receiving data");
                    this._log.error(e);
                    this.reconnect();
                    return;
                }
            }
            try {
                await this._processMessage(message);
            }
            catch (e) {
                this._log.error("Unhandled error while receiving data");
                this._log.error(e);
            }
        }
    }
    // Response Handlers
    /**
     * Adds the given message to the list of messages that must be
     * acknowledged and dispatches control to different ``_handle_*``
     * method based on its type.
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _processMessage(message) {
        this._pendingAck.add(message.msgId);
        message.obj = await message.obj;
        let handler = this._handlers[message.obj.CONSTRUCTOR_ID.toString()];
        if (!handler) {
            handler = this._handleUpdate.bind(this);
        }
        await handler(message);
    }
    /**
     * Pops the states known to match the given ID from pending messages.
     * This method should be used when the response isn't specific.
     * @param msgId
     * @returns {*[]}
     * @private
     */
    _popStates(msgId) {
        let state = this._pendingState.get(msgId.toString());
        if (state) {
            this._pendingState.delete(msgId.toString());
            return [state];
        }
        const toPop = [];
        for (const state of Object.values(this._pendingState)) {
            if (state.containerId && state.containerId.equals(msgId)) {
                toPop.push(state.msgId);
            }
        }
        if (toPop.length) {
            const temp = [];
            for (const x of toPop) {
                temp.push(this._pendingState.get(x));
                this._pendingState.delete(x);
            }
            return temp;
        }
        for (const ack of this._lastAcks) {
            if (ack.msgId === msgId) {
                return [ack];
            }
        }
        return [];
    }
    /**
     * Handles the result for Remote Procedure Calls:
     * rpc_result#f35c6d01 req_msg_id:long result:bytes = RpcResult;
     * This is where the future results for sent requests are set.
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    _handleRPCResult(message) {
        const RPCResult = message.obj;
        const state = this._pendingState.get(RPCResult.reqMsgId.toString());
        if (state) {
            this._pendingState.delete(RPCResult.reqMsgId.toString());
        }
        this._log.debug(`Handling RPC result for message ${RPCResult.reqMsgId}`);
        if (!state) {
            // TODO We should not get responses to things we never sent
            // However receiving a File() with empty bytes is "common".
            // See #658, #759 and #958. They seem to happen in a container
            // which contain the real response right after.
            try {
                const reader = new extensions_1.BinaryReader(RPCResult.body);
                if (!(reader.tgReadObject() instanceof tl_1.Api.upload.File)) {
                    throw new Error("Not an upload.File");
                }
            }
            catch (e) {
                this._log.error(e);
                if (e instanceof errors_1.TypeNotFoundError) {
                    this._log.info(`Received response without parent request: ${RPCResult.body}`);
                    return;
                }
                else {
                    throw e;
                }
            }
            return;
        }
        if (RPCResult.error && state.msgId) {
            const error = errors_1.RPCMessageToError(RPCResult.error, state.request);
            this._sendQueue.append(new RequestState_1.RequestState(new tl_1.Api.MsgsAck({ msgIds: [state.msgId] })));
            state.reject(error);
        }
        else {
            const reader = new extensions_1.BinaryReader(RPCResult.body);
            const read = state.request.readResult(reader);
            state.resolve(read);
        }
    }
    /**
     * Processes the inner messages of a container with many of them:
     * msg_container#73f1f8dc messages:vector<%Message> = MessageContainer;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _handleContainer(message) {
        this._log.debug("Handling container");
        for (const innerMessage of message.obj.messages) {
            await this._processMessage(innerMessage);
        }
    }
    /**
     * Unpacks the data from a gzipped object and processes it:
     * gzip_packed#3072cfa1 packed_data:bytes = Object;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _handleGzipPacked(message) {
        this._log.debug("Handling gzipped data");
        const reader = new extensions_1.BinaryReader(message.obj.data);
        message.obj = reader.tgReadObject();
        await this._processMessage(message);
    }
    async _handleUpdate(message) {
        if (message.obj.SUBCLASS_OF_ID !== 0x8af52aac) {
            // crc32(b'Updates')
            this._log.warn(`Note: ${message.obj.className} is not an update, not dispatching it`);
            return;
        }
        this._log.debug("Handling update " + message.obj.className);
        if (this._updateCallback) {
            this._updateCallback(this._client, message.obj);
        }
    }
    /**
     * Handles pong results, which don't come inside a ``RPCResult``
     * but are still sent through a request:
     * pong#347773c5 msg_id:long ping_id:long = Pong;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _handlePong(message) {
        const pong = message.obj;
        this._log.debug(`Handling pong for message ${pong.msgId}`);
        const state = this._pendingState.get(pong.msgId.toString());
        this._pendingState.delete(pong.msgId.toString());
        // Todo Check result
        if (state) {
            state.resolve(pong);
        }
    }
    /**
     * Corrects the currently used server salt to use the right value
     * before enqueuing the rejected message to be re-sent:
     * bad_server_salt#edab447b bad_msg_id:long bad_msg_seqno:int
     * error_code:int new_server_salt:long = BadMsgNotification;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _handleBadServerSalt(message) {
        const badSalt = message.obj;
        this._log.debug(`Handling bad salt for message ${badSalt.badMsgId}`);
        this._state.salt = badSalt.newServerSalt;
        const states = this._popStates(badSalt.badMsgId);
        this._sendQueue.extend(states);
        this._log.debug(`${states.length} message(s) will be resent`);
    }
    /**
     * Adjusts the current state to be correct based on the
     * received bad message notification whenever possible:
     * bad_msg_notification#a7eff811 bad_msg_id:long bad_msg_seqno:int
     * error_code:int = BadMsgNotification;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _handleBadNotification(message) {
        const badMsg = message.obj;
        const states = this._popStates(badMsg.badMsgId);
        this._log.debug(`Handling bad msg ${JSON.stringify(badMsg)}`);
        if ([16, 17].includes(badMsg.errorCode)) {
            // Sent msg_id too low or too high (respectively).
            // Use the current msg_id to determine the right time offset.
            const to = this._state.updateTimeOffset(big_integer_1.default(message.msgId));
            this._log.info(`System clock is wrong, set time offset to ${to}s`);
        }
        else if (badMsg.errorCode === 32) {
            // msg_seqno too low, so just pump it up by some "large" amount
            // TODO A better fix would be to start with a new fresh session ID
            this._state._sequence += 64;
        }
        else if (badMsg.errorCode === 33) {
            // msg_seqno too high never seems to happen but just in case
            this._state._sequence -= 16;
        }
        else {
            for (const state of states) {
                state.reject(new errors_1.BadMessageError(state.request, badMsg.errorCode));
            }
            return;
        }
        // Messages are to be re-sent once we've corrected the issue
        this._sendQueue.extend(states);
        this._log.debug(`${states.length} messages will be resent due to bad msg`);
    }
    /**
     * Updates the current status with the received detailed information:
     * msg_detailed_info#276d3ec6 msg_id:long answer_msg_id:long
     * bytes:int status:int = MsgDetailedInfo;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _handleDetailedInfo(message) {
        // TODO https://goo.gl/VvpCC6
        const msgId = message.obj.answerMsgId;
        this._log.debug(`Handling detailed info for message ${msgId}`);
        this._pendingAck.add(msgId);
    }
    /**
     * Updates the current status with the received detailed information:
     * msg_new_detailed_info#809db6df answer_msg_id:long
     * bytes:int status:int = MsgDetailedInfo;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _handleNewDetailedInfo(message) {
        // TODO https://goo.gl/VvpCC6
        const msgId = message.obj.answerMsgId;
        this._log.debug(`Handling new detailed info for message ${msgId}`);
        this._pendingAck.add(msgId);
    }
    /**
     * Updates the current status with the received session information:
     * new_session_created#9ec20908 first_msg_id:long unique_id:long
     * server_salt:long = NewSession;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _handleNewSessionCreated(message) {
        // TODO https://goo.gl/LMyN7A
        this._log.debug("Handling new session created");
        this._state.salt = message.obj.serverSalt;
    }
    /**
     * Handles a server acknowledge about our messages. Normally
     * these can be ignored except in the case of ``auth.logOut``:
     *
     *     auth.logOut#5717da40 = Bool;
     *
     * Telegram doesn't seem to send its result so we need to confirm
     * it manually. No other request is known to have this behaviour.

     * Since the ID of sent messages consisting of a container is
     * never returned (unless on a bad notification), this method
     * also removes containers messages when any of their inner
     * messages are acknowledged.

     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _handleAck(message) {
        const ack = message.obj;
        this._log.debug(`Handling acknowledge for ${ack.msgIds}`);
        for (const msgId of ack.msgIds) {
            const state = this._pendingState.get(msgId);
            if (state && state.request instanceof tl_1.Api.auth.LogOut) {
                this._pendingState.delete(msgId);
                state.resolve(true);
            }
        }
    }
    /**
     * Handles future salt results, which don't come inside a
     * ``rpc_result`` but are still sent through a request:
     *     future_salts#ae500895 req_msg_id:long now:int
     *     salts:vector<future_salt> = FutureSalts;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _handleFutureSalts(message) {
        // TODO save these salts and automatically adjust to the
        // correct one whenever the salt in use expires.
        this._log.debug(`Handling future salts for message ${message.msgId}`);
        const state = this._pendingState.get(message.msgId.toString());
        if (state) {
            this._pendingState.delete(message.msgId.toString());
            state.resolve(message.obj);
        }
    }
    /**
     * Handles both :tl:`MsgsStateReq` and :tl:`MsgResendReq` by
     * enqueuing a :tl:`MsgsStateInfo` to be sent at a later point.
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _handleStateForgotten(message) {
        this._sendQueue.append(new RequestState_1.RequestState(new tl_1.Api.MsgsStateInfo({
            reqMsgId: message.msgId,
            info: String.fromCharCode(1).repeat(message.obj.msgIds),
        })));
    }
    /**
     * Handles :tl:`MsgsAllInfo` by doing nothing (yet).
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _handleMsgAll(message) { }
    reconnect() {
        if (this._userConnected && !this._reconnecting) {
            this._reconnecting = true;
            // TODO Should we set this?
            // this._user_connected = false
            // we want to wait a second between each reconnect try to not flood the server with reconnects
            // in case of internal server issues.
            Helpers_1.sleep(1000).then(() => {
                this._log.info("Started reconnecting");
                this._reconnect();
            });
        }
    }
    async _reconnect() {
        this._log.debug("Closing current connection...");
        try {
            await this.disconnect();
        }
        catch (err) {
            this._log.warn(err);
        }
        // @ts-ignore
        this._sendQueue.append(undefined);
        this._state.reset();
        // For some reason reusing existing connection caused stuck requests
        const constructor = this._connection
            .constructor;
        const newConnection = new constructor(this._connection._ip, this._connection._port, this._connection._dcId, this._connection._log, this._connection._proxy);
        await this.connect(newConnection, true);
        this._reconnecting = false;
        this._sendQueue.extend(Array.from(this._pendingState.values()));
        this._pendingState = new Map();
        if (this._autoReconnectCallback) {
            await this._autoReconnectCallback();
        }
    }
}
exports.MTProtoSender = MTProtoSender;
MTProtoSender.DEFAULT_OPTIONS = {
    logger: null,
    retries: Infinity,
    delay: 2000,
    autoReconnect: true,
    connectTimeout: null,
    authKeyCallback: null,
    updateCallback: null,
    autoReconnectCallback: null,
    isMainSender: null,
    senderCallback: null,
    onConnectionBreak: undefined,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTVRQcm90b1NlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2dyYW1qcy9uZXR3b3JrL01UUHJvdG9TZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsK0NBQTRDO0FBQzVDLGlEQUE4QztBQUM5Qyw4Q0FBcUQ7QUFDckQsOENBQThDO0FBQzlDLHFDQUFnRjtBQUNoRiw4QkFBNEI7QUFDNUIsOERBQWlDO0FBQ2pDLHdDQUFtQztBQUNuQyxpREFBOEM7QUFDOUMsbURBQW1EO0FBQ25ELDZEQUEwRDtBQUMxRCxzQ0FNbUI7QUFDbkIseUJBQXVEO0FBbUJ2RCxNQUFhLGFBQWE7SUErQ3RCOzs7T0FHRztJQUNILFlBQVksT0FBNEIsRUFBRSxJQUFxQjtRQUMzRCxNQUFNLElBQUksbUNBQVEsYUFBYSxDQUFDLGVBQWUsR0FBSyxJQUFJLENBQUUsQ0FBQztRQUMzRCxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDM0MsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUN6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