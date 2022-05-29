import { Worker } from './Worker.mjs';

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
               const worker = new Worker(user);
               await worker.run();
          }
     }
}
