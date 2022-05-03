import { ClientsPool } from '../models/index.mjs';

export class ScanContacts {
    async execute(params) {
        console.log('ScanContacts...');
        //todo: find way how to handle results one by one
        console.log(ClientsPool.pool);
        return ClientsPool.checkStatuses();
        // todo: handle result;
    }
}
