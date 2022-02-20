import { StringSession } from 'telegram/sessions/index.js';
import { TelegramClient } from 'telegram/index.js';
import { AuthKey } from 'telegram/crypto/AuthKey.js';

export class TelegramClientAdapter extends TelegramClient {
    /**
     * @typedef {Class} TelegramClientAdapter
    */

    /**
     * @param {Object} sessionConfig - Telegram command to be invoked
     * @param {String} sessionConfig.dc_id - Telegram DC ID
     * @param {String} sessionConfig.server_address - Telegram session server address
     * @param {Number} sessionConfig.port - Telegram session port
     * @param {String} sessionConfig.auth_key - Telegram session authentication key
     * @param {Object} appConfig - application configuration
     * @param {Number} appConfig.apiId - Telegram Api id
     * @param {String} appConfig.apiHash - Telegram Api hash
     */    
     constructor(sessionConfig, appConfig) {
         const session = new StringSession();
         const authKey = new AuthKey();
 
         authKey.setKey(sessionConfig.auth_key);
         session.setDC(sessionConfig.dc_id, sessionConfig.server_address, sessionConfig.port);
         session.setAuthKey(authKey);
 
         super(session, appConfig.apiId, appConfig.apiHash, {});
     }
 }
