import { User, WorkersQueue } from '../models/index.mjs';

export class InitWorkersQueue {
    async execute() {
        const workerQueue = new WorkersQueue();
        let page = 0;
        const size = 10;
        const total = await new User().getTotal();

        while( page * size <= total) {
            const users = await new User().readList({ page, size });

            for (const user of users) {
                if (user.active) {
                    workerQueue.enque(user);
                }
            }
            await workerQueue.execute();

            page += 1;
        }
    }
}
