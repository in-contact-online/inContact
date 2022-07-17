import { Axios } from 'axios';
import { Status, IStatusesResponse, IStatusRaw } from '../../models';

type ReadParams = { page: number; size: number; phoneNumber?: string; checkFrom?: string; checkTo?: string };

export interface IAxiosStatusesApi {
    readList: (params: ReadParams) => Promise<null | IStatusesResponse>;
}

export class AxiosStatusesApi implements IAxiosStatusesApi {
    private http: Axios;

    constructor(http: Axios) {
        this.http = http;
    }

    async readList(params: ReadParams) {
        let query = `page=${params.page}&size=${params.size}`;
        query += params.phoneNumber ? `&phoneNumber=${params.phoneNumber}` : '';
        query += params.checkFrom ? `&checkFrom=${params.checkFrom}` : '';
        query += params.checkTo ? `&checkTo=${params.checkTo}` : '';

        const response = await this.http.get(`/statuses?${query}`);

        if (response) {
            response.data.data = response.data.data.map((item: IStatusRaw) => new Status(item));
            return response.data;
        }
        return null;
    }
}
