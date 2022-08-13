type ReadParams = { page: number; size: number };

export interface IMockSessionsApi {
    readList: (params: ReadParams) => Promise<null | {}>;
    add: (params: FormData) => Promise<null>;
}

export class MockSessionsApi implements IMockSessionsApi {
    private mock: any;

    constructor(mock: any) {
        this.mock = mock;
    }

    async readList(params: ReadParams) {
        const start = params.page * params.size;
        const end = start + params.size;
        return this.mock.slice(start, end);
    }

    async add(params: FormData) {
        return null;
    }
}
