import { ClientsPool } from '../models/index.mjs';
import { Contact } from '../models/index.mjs';

export class UpdateSessionsPool {
    async execute(params) {
        const addList = await new Contact().getList({ tracked: true, withSession: false });
        await ClientsPool.addContacts(addList);

        const removeList = await new Contact().getList({ tracked: false, withSession: true });
        await ClientsPool.removeContacts(removeList);
    }
}
