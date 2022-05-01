
export class MockSystemHealthApi {

     #mock = null;

     /**
      * @param {Array<Object>} mock - mock data
      */
     constructor(mock) {
          this.#mock = mock;
     }

     /**
      * @return {Promise<Object>}
      */
     async read({ page, size }) {
          const start = page * size;
          const end = start + size;
          return this.#mock.slice(start, end);
     }
}
