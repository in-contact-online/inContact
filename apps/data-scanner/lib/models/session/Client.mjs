import { v4 as uuidv4 } from 'uuid'
import { TelegramClientAdapter } from './TelegramClientAdapter.mjs'

export class Client {
     #api = null;
     #uid = null;
 
     constructor({ dc_id, server_address, port, auth_key }, apiConfig) {
         this.#uid = uuidv4();
         this.#api = new TelegramClientAdapter({ dc_id, server_address, port, auth_key }, apiConfig);
     }
 
     async init() {
         await this.#api.connect();
     }

     async invoke(command) {
         return this.#api.session.invoke(command);

     }
 
     get uid() {
         return this.#uid;
     }
 }
