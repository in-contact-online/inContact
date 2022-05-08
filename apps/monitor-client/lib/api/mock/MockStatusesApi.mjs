
export class MockStatusesApi {

     #mock = null;

     /**
      * @param {Array<Object>} mock - mock data
      */
     constructor(mock) {
          this.#mock = mock;
     }

     /**
      * @param {Object} params - params object
      * @param {Number} params.page - number of page
      * @param {Number} params.size - sessions per page
      * @param {String?} params.phoneNumber - phone number
      * @param {String?} params.checkFrom - check datetime
      * @param {String?} params.checkTo - check datetime
      * @return {Promise<Object>}
      */
     async readList({ page, size, phoneNumber, checkFrom, checkTo }) {
          const start = page * size;
          const end = start + size;
          let result = this.#mock.slice(start, end);

          if (phoneNumber) {
               result = result.filter(status => status.phone_number === phoneNumber);
          }

          if (checkFrom) {
               result = result.filter(status => new Date(status.check_date).getTime() >= new Date(checkFrom).getTime());
          }

          if (checkTo) {
               result = result.filter(status => new Date(status.check_date).getTime() <= new Date(checkTo).getTime());
          }

          return result;
     }
}
