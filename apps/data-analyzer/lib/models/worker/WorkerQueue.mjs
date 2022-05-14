import logger from '../../api/logger.mjs';

export class WorkersQueue {
     #pool = null;

     constructor() {
          this.#pool = [];
     }

     enque(user) {
          this.#pool.push(user);
          return this.#pool;
     }

     deque() {
          return this.#pool.shift();
     }

     async execute() {
          while (this.#pool.length) {
               const user = this.deque();
               logger.info(user)
          }
     }
}
