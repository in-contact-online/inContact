import axios from 'axios';
import { AxiosContactsApi, IAxiosContactApi } from './AxiosContactsApi';
import { AxiosSessionsApi, IAxiosSessionsApi } from './AxiosSessionsApi';
import { AxiosUsersApi, IAxiosUsersApi } from './AxiosUsersApi';
import { AxiosSystemHealthApi, IAxiosSystemHealthApi } from './AxiosSystemHealthApi';
import { AxiosStatusesApi, IAxiosStatusesApi } from './AxiosStatusesApi';


type ClientOptions = { baseURL: string };

export interface IAxiosClientApi {
     readonly users: IAxiosUsersApi;
     readonly contacts: IAxiosContactApi;
     readonly sessions: IAxiosSessionsApi;
     readonly statuses: IAxiosStatusesApi;
     readonly systemHealth: IAxiosSystemHealthApi;
}

export class AxiosClientApi implements IAxiosClientApi {

     private _users: IAxiosUsersApi;

     private _contacts: IAxiosContactApi;

     private _sessions: IAxiosSessionsApi;

     private _statuses: IAxiosStatusesApi;

     private _systemHealth: IAxiosSystemHealthApi;

     constructor(options: ClientOptions ) {
          const instance = axios.create({
               baseURL: options.baseURL,
               timeout: 1000,
          });
          this._users = new AxiosUsersApi(instance);
          this._contacts = new AxiosContactsApi(instance);
          this._sessions = new AxiosSessionsApi(instance);
          this._systemHealth = new AxiosSystemHealthApi(instance);
          this._statuses = new AxiosStatusesApi(instance);
     }

     get users(): IAxiosUsersApi {
          return this._users;
     }

     get contacts(): IAxiosContactApi {
          return this._contacts;
     }

     get sessions(): IAxiosSessionsApi {
          return this._sessions;
     }

     get statuses(): IAxiosStatusesApi {
          return this._statuses;
     }

     get systemHealth(): IAxiosSystemHealthApi {
          return this._systemHealth;
     }
}
