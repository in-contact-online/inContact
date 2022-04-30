import { Api } from 'telegram';
import { Sessions } from '../models/index.mjs';

export class ScanContacts {
    async execute(params) {
        console.log('ScanContacts: ', params);
        //todo: find way how to handle results one by one
        return Sessions.invokeEach(new Api.contacts.GetContacts({}));
        // todo: handle result;
    }
}
