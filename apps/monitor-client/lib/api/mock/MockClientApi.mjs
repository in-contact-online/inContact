import { MockContactsApi } from './MockContactsApi.mjs';
import { MockSessionsApi } from './MockSessionsApi.mjs';
import { MockUsersApi } from './MockUsersApi.mjs';
import { MockSystemHealthApi } from './MockSystemHealthApi.mjs';
import mock from './mock.json';

export class MockClientApi {
     
     #users = null;

     #contacts = null;

     #sessions = null;

     #systemHealth = null;

     constructor() {
          this.#users = new MockUsersApi(mock.users);
          this.#contacts = new MockContactsApi(mock.contacts);
          this.#sessions = new MockSessionsApi(mock.sessions);
          this.#systemHealth = new MockSystemHealthApi(mock.systemHealth);
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

     get systemHealth() {
          return this.#systemHealth;
     }
}
