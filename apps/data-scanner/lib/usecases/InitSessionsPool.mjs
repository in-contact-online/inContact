import { Sessions } from '../models/index.mjs';


export class InitSessionsPool {
    async execute(params) {
        console.log('InitSessionsPool: ', params);
        return Sessions.init(params);
    }
}
