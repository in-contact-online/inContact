import WebSocket from 'ws';
import * as ConfigContainer from '../../lib/config.cjs';

export class WsApi {
    /**
     * @typedef {Class} WsApi
     */

    /**
     * @property {Object|null}
     */
    #wsClient = null;

    constructor() {
        this.#wsClient = new WebSocket(`ws://localhost:${ConfigContainer.config.wsPort}`);
    }

    /**
     * @method
     * @return {VoidFunction}
     */
    init() {
        this.#wsClient.on('message', (msg) => {
            this.onMessage(msg.toString());
        });
        this.#wsClient.on('close', () => {
            this.onClose();
        });
    }

    /**
     * @method
     * @return {VoidFunction}
     */
    close() {
        this.#wsClient.close();
    }

    /**
     * @method
     * @param {Object} message - ws message
     * @return {undefined}
     */
    send = (message) => {
        if (this.#wsClient.readyState === WebSocket.OPEN) {
            this.#wsClient.send(JSON.stringify(message));
        } else {
            setTimeout(() => {
                this.send(message);
            }, 10);
        }
    };

    /**
     * @method
     * @param {Function} callback - on message callback
     * @return {undefined}
     */
    setOnMessage = (callback) => {
        this.onMessage = callback;
    };

    /**
     * @method
     * @param {string} message - websocket message
     * @return {undefined}
     */
    // eslint-disable-next-line no-unused-vars
    onMessage = (message) => {};

    /**
     * @method
     * @param {Function} callback - on message callback
     * @return {undefined}
     */
    setOnClose = (callback) => {
        this.onClose = callback;
    };

    /**
     * @method
     * @return {undefined}
     */
    onClose = () => {};
}
