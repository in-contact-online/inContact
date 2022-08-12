import { Axios } from 'axios';
import { IContactsResponse, Contact, IContactRaw } from '../../models';

type ReadParams = { page: number; size: number };

export interface IAxiosContactApi {
    readList: (params: ReadParams) => Promise<null | IContactsResponse>;
}

export class AxiosContactsApi implements IAxiosContactApi {
    private http: Axios;

    constructor(http: Axios) {
        this.http = http;
    }

    async readList(params: ReadParams) {
        const response = await this.http.get(`/contacts?page=${params.page}&size=${params.size}`);
        if (response) {
            response.data.data = response.data?.data.map((item: IContactRaw) => new Contact(item));
            return response.data;
        }
        return null;
    }
}
