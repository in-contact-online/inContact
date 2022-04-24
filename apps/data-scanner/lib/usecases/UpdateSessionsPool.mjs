import { Sessions } from '../models/index.mjs';

export class UpdateSessionsPool {
    async execute(params) {
        console.log('UpdateSessionsPool: ', params);
          // todo: check for new sessions addSessionsList
          // todo: sessions.add(addSessionsList)
          // todo: add functionality that is checking phone numbers that should be added or removed
          // todo: read DB and return two lists (addList, removeList)
          // sessions.addPhones(addList); [{trackedPhone: 1231313}, ...]
          // sessions.deletePhones(removeList); [{trackedPhone: 1231313, sessionId: 1231313}, ...]
    }
}
