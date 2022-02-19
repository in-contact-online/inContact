import { StringSession } from 'telegram/sessions/index.js';
import { TelegramClient } from 'telegram/index.js';
import { AuthKey } from 'telegram/crypto/AuthKey.js';


export class TelegramClientAdapter extends TelegramClient {
     constructor({ dc_id, server_address, port, auth_key }, config) {
         const session = new StringSession();
         const authKey = new AuthKey();
 
         authKey.setKey(auth_key);
         session.setDC(dc_id, server_address, port);
         session.setAuthKey(authKey);
 
         super(session, config.apiId, config.apiHash, {});
     }
 }
