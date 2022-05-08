type ReadParams = { page: number, size: number, phoneNumber?: string, checkFrom?: string, checkTo?: string };

export interface IMockStatusesApi {
     readList: (params: ReadParams) => Promise<null | {}>;
}

export class MockStatusesApi implements IMockStatusesApi {

     private mock: any;

     constructor(mock: any) {
          this.mock = mock;
     }

     async readList(params: ReadParams) {
          const start = params.page * params.size;
          const end = start + params.size;
          // let result = this.mock.slice(start, end);

          // if (params.phoneNumber) {
          //      result = result.filter(status => status.phone_number === params.phoneNumber);
          // }

          // if (params.checkFrom) {
          //      const checkFrom: string = params.checkFrom;
          //      result = result.filter(status => new Date(status.check_date).getTime() >= new Date(checkFrom).getTime());
          // }

          // if (params.checkTo) {
          //      const checkTo: string = params.checkTo;
          //      result = result.filter(status => new Date(status.check_date).getTime() <= new Date(checkTo).getTime());
          // }

          return this.mock;
     }
}
