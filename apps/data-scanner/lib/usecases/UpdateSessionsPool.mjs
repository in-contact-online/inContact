import { Sessions } from '../models/index.mjs';
import { UpdateSessions } from './UpdateSessions.mjs';
import { Contact } from '../models/index.mjs';

export class UpdateSessionsPool {
    async execute(params) {
        // todo: check for new sessions addSessionsList
        // todo: sessions.add(addSessionsList)

        const addList = await new Contact().getList({ tracked: true, withSession: false });
        await Sessions.addPhones(addList);
        // await Sessions.deletePhones(removeList);
        // sessions.deletePhones(removeList); [{trackedPhone: 1231313, sessionId: 1231313}, ...]
    }
}
