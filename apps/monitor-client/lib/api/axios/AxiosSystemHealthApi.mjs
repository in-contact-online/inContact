export class AxiosSystemHealthApi {
     #http = null;

     /**
     * @param http - Axios instance
     */
     constructor(http) {
          this.#http = http;
     }

     /**
      * @return {Promise<Object>}
      */
     async read() {
          const response = await this.#http.get('/system_health');
          return response ? response.data : null;
     }
}
