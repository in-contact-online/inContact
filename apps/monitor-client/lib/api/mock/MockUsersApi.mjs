
export class MockUsersApi {

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
      * @param {Number} params.size - users per page
      * @return {Promise<Array<Object>>}
      */
     async readList({ page, size }) {
          const start = page * size;
          const end = start + size;
          return this.#mock.slice(start, end);
     }
}
