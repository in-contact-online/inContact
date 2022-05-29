import { ClientsPool } from '../models/index.mjs';

export class InitSessionsPool {
    async execute(params) {
        return ClientsPool.init(params);
    }
}
