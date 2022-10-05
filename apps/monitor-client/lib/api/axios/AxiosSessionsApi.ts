import { Axios } from 'axios';
import { Session, ISessionRaw, ISessionsReposnse } from '../../models';

type ReadParams = { page: number; size: number };

export interface IAxiosSessionsApi {
    readList: (params: ReadParams) => Promise<null | ISessionsReposnse>;
    add: (file: FormData) => Promise<null>;
    del: (id: string) => Promise<null>;
    sync: () => Promise<null>;
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

    async add(params: FormData) {
        const response = await this.http.post(`/sessions`, params, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response) {
            return response.data;
        }
        return null;
    }

    async del(id: string) {
        const response = await this.http.delete(`/sessions/${id}`);
        if (response) {
            return response.data;
        }
        return null;
    }

    async sync() {
        const response = await this.http.get('/sessions_sync');
        if (response) return response.data;
        return null;
    }
}
