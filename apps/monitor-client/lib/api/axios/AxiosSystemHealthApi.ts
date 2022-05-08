import { Axios } from "axios";
import { System } from '../../models';

export interface IAxiosSystemHealthApi {
     read: () => Promise<null | System>;
}

export class AxiosSystemHealthApi implements IAxiosSystemHealthApi {
     
     private http: Axios;

     constructor(http: Axios) {
          this.http = http;
     }

     async read() {
          const response = await this.http.get('/system_health');
          if (response) {
               return new System(response.data)
          }
          return null;
     }
}
