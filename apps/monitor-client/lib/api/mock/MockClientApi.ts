import { IMockContactApi, MockContactsApi } from './MockContactsApi';
import { IMockSessionsApi, MockSessionsApi } from './MockSessionsApi';
import { IMockStatusesApi, MockStatusesApi } from './MockStatusesApi';
import { IMockUsersApi, MockUsersApi } from './MockUsersApi';
import { IMockSystemHealthApi, MockSystemHealthApi } from './MockSystemHealthApi';
import mock from './mock.json';

export interface IMockClientApi {
     readonly users: IMockUsersApi;
     readonly contacts: IMockContactApi;
     readonly sessions: IMockSessionsApi;
     readonly statuses: IMockStatusesApi;
     readonly systemHealth: IMockSystemHealthApi;
}

export class MockClientApi {
     
     private _users: IMockUsersApi;

     private _contacts: IMockContactApi;

     private _sessions: IMockSessionsApi;

     private _statuses: IMockStatusesApi;

     private _systemHealth: IMockSystemHealthApi;

     constructor() {
          this._users = new MockUsersApi(mock.users);
          this._contacts = new MockContactsApi(mock.contacts);
          this._sessions = new MockSessionsApi(mock.sessions);
          this._statuses = new MockStatusesApi(mock.statuses);
          this._systemHealth = new MockSystemHealthApi(mock.systemHealth);
     }

     get users() {
          return this._users;
     }

     get contacts() {
          return this._contacts;
     }

     get sessions() {
          return this._sessions;
     }

     get statuses() {
          return this._statuses;
     }

     get systemHealth() {
          return this._systemHealth;
     }
}
