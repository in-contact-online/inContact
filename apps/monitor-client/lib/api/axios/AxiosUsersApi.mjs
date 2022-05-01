export class AxiosUsersApi {
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
      * @param {Number} params.size - users per page
      * @return {Promise<Object>}
      */
     async readList({ page, size }) {
          const response = await this.#http.get(`/users?page=${page}&size=${size}`);
          return response ? response.data : null;
     }
}
