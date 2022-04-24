import { Api } from 'telegram';
import { Sessions } from '../models/index.mjs';


export class ScanContacts {
    async execute(params) {
        console.log('ScanContacts: ', params);
        return Sessions.invokeEach(new Api.contacts.GetContacts({}))
    }
}
