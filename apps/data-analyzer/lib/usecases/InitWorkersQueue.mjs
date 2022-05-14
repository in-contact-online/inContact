import { User, WorkersQueue } from '../models/index.mjs';

export class InitWorkersQueue {
    async execute() {
        const workerQueue = new WorkersQueue();
        const users = await new User().readList({ page: 0, size: 100 });
        for (const user of users) {
            if (user.active) {
                workerQueue.enque(user);
            }
        }

        await workerQueue.execute();
    }
}
