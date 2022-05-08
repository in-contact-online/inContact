export class AxiosStatusesApi {
     #http = null;

     /**
     * @param http - Axios instance
     */
     constructor(http) {
          this.#http = http;
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
          let query = `page=${page}&size=${size}`;
          query += phoneNumber ? `&phoneNumber=${phoneNumber}` : '';
          query += checkFrom ? `&checkFrom=${checkFrom}` : '';
          query += checkTo ? `&checkTo=${checkTo}` : '';

          const response = await this.#http.get(`/statuses?${query}`);
          return response ? response.data : null;
     }
}
