type ReadParams = { page: number, size: number };

export interface IMockUsersApi {
     readList: (params: ReadParams) => Promise<null | {}>;
}

export class MockUsersApi implements IMockUsersApi {

     private mock: any;

     constructor(mock: any) {
          this.mock = mock;
     }

     async readList(params: ReadParams) {
          const start = params.page * params.size;
          const end = start + params.size;
          return this.mock;
     }
}
