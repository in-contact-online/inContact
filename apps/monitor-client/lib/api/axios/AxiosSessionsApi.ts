import { Axios } from 'axios';
import { Session, ISessionRaw, ISessionsReposnse } from '../../models';

type ReadParams = { page: number; size: number };

export interface IAxiosSessionsApi {
    readList: (params: ReadParams) => Promise<null | ISessionsReposnse>;
}

export class AxiosSessionsApi implements IAxiosSessionsApi {
    private http: Axios;

    constructor(http: Axios) {
        this.http = http;
    }

    async readList(params: ReadParams) {
        const response = await this.http.get(`/sessions?page=${params.page}&size=${params.size}`);
        if (response) {
            response.data.data = response.data.data.map((item: ISessionRaw) => new Session(item));
            return response.data;
        }
        return null;
    }
}
