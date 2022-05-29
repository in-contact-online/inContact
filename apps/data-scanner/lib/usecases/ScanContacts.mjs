import { ClientsPool } from '../models/index.mjs';

export class ScanContacts {
    async execute(params) {
        //todo: find way how to handle results one by one
        return ClientsPool.checkStatuses();
        // todo: handle result;
    }
}
