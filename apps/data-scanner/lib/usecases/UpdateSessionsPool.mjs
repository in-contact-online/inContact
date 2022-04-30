import { ClientsPool } from '../models/index.mjs';
import { Contact } from '../models/index.mjs';

export class UpdateSessionsPool {
    async execute(params) {
        // todo: check for new sessions addSessionsList
        // todo: sessions.add(addSessionsList)

        console.log('UpdateSessionsPool...');
        const contacts = await new Contact().getList({ tracked: true, withSession: false });
        const addList = contacts.map((contact) => contact.tracked_phone);
        await ClientsPool.addContacts(addList);
        // await Sessions.deletePhones(removeList);
        // sessions.deletePhones(removeList); [{trackedPhone: 1231313, sessionId: 1231313}, ...]
    }
}
