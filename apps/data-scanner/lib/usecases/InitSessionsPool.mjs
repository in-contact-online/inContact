import { ClientsPool } from '../models/index.mjs';

export class InitSessionsPool {
    async execute() {
        return ClientsPool.init();
    }
}
