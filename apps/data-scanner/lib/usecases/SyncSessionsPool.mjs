import {ClientsPool} from '../models/index.mjs';

export class SyncSessionsPool {
    async execute() {
        return await ClientsPool.sync()
    }
}
