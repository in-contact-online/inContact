import { Axios } from 'axios';
import { IUsersResponse, IUserRaw, User } from '../../models';

type ReadParams = { page: number, size: number };

export interface IAxiosUsersApi {
     readList: (params: ReadParams) => Promise<null | IUsersResponse>;
}

export class AxiosUsersApi implements IAxiosUsersApi {
     private http: Axios;

     constructor(http: Axios) {
          this.http = http;
     }

     async readList(params: ReadParams) {
          const response = await this.http.get(`/users?page=${params.page}&size=${params.size}`);
          if (response) {
               response.data.data = response.data.data.map((item: IUserRaw) => new User(item));
               return response.data;
          }
          return null;
     }
}
