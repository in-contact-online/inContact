type ReadParams = { page: number, size: number };

export interface IMockSystemHealthApi {
     read: () => Promise<null | {}>;
}

export class MockSystemHealthApi implements MockSystemHealthApi {

     private mock: any;

     constructor(mock: any) {
          this.mock = mock;
     }

     async read() {
          return this.mock;
     }
}
