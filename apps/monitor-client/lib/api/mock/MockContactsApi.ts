type ReadParams = { page: number, size: number };

export interface IMockContactApi {
     readList: (params: ReadParams) => Promise<null | {}>;
}

export class MockContactsApi implements IMockContactApi {

     private mock: any;

     constructor(mock: any) {
          this.mock = mock;
     }

     async readList(params: ReadParams) {
          const start = params.page * params.size;
          const end = start + params.size;
          return this.mock.slice(start, end);
     }
}
