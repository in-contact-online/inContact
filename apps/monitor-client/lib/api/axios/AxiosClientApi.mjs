import axios from 'axios';
import { AxiosContactsApi } from './AxiosContactsApi.mjs';
import { AxiosSessionsApi } from './AxiosSessionsApi.mjs';
import { AxiosUsersApi } from './AxiosUsersApi.mjs';
import { AxiosSystemHealthApi } from './AxiosSystemHealthApi.mjs';
import { AxiosStatusesApi } from './AxiosStatusesApi.mjs';

export class AxiosClientApi {

     #users = null;

     #contacts = null;

     #sessions = null;

     #statuses = null;

     #systemHealth = null;

     /**
     * @param {Object} options - client options object
     * @param {String} options.baseURL - clients base URL
     */
     constructor(options) {
          const instance = axios.create({
               baseURL: options.baseURL,
               timeout: 1000,
          });
          this.#users = new AxiosUsersApi(instance);
          this.#contacts = new AxiosContactsApi(instance);
          this.#sessions = new AxiosSessionsApi(instance);
          this.#systemHealth = new AxiosSystemHealthApi(instance);
          this.#statuses = new AxiosStatusesApi(instance);
     }

     get users() {
          return this.#users;
     }

     get contacts() {
          return this.#contacts;
     }

     get sessions() {
          return this.#sessions;
     }

     get statuses() {
          return this.#statuses;
     }

     get systemHealth() {
          return this.#systemHealth;
     }
}
