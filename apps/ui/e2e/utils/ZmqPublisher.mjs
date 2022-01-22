import zmq from 'zeromq';
import * as ConfigContainer from '../../lib/config.cjs';

export class ZmqPublisher {
    /**
     * @typedef {Class} ZmqPublisher - publish messages for message processor instead of JSON/Bin convertor
     */

    /**
     * @property {Object|null}
     */
    socket = null;

    async init() {
        this.socket = zmq.socket('pub');
        this.socket.bindSync(ConfigContainer.config.zmqPubSubUrl);
        return new Promise((resolve) => {
            // Need to make port bind before message send
            setTimeout(() => {
                resolve();
            }, 200);
        });
    }

    /**
     * @method
     * @return {VoidFunction}
     */
    destroy() {
        this.socket.close();
    }

    /**
     * @method
     * @param {String} channel - channel name one of ~pos, ~obsolete, ~event, ~data
     * @param {Object} object - published object
     * @return {VoidFunction}
     */
    send(channel, object) {
        const zmqMessage = `${channel} ${JSON.stringify(object)}`;
        this.socket.send(zmqMessage);
    }
}
