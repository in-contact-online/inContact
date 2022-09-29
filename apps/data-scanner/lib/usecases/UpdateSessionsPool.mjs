import {ClientsPool} from '../models/index.mjs';
import {Contact} from '../models/index.mjs';

export class UpdateSessionsPool {
    async execute() {
        const addList = await new Contact().getList({tracked: true, withSession: false});
        await ClientsPool.addContacts(addList);

        const removeList = await new Contact().getList({tracked: false, withSession: true});
        await ClientsPool.removeContacts(removeList);
        console.log(ClientsPool.pool.map(client => client.sessionId));
    }
}
