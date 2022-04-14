import { addContacts } from './addContacts.mjs';
import { sqliteTelegramClient } from './sqliteTelegramClient.mjs';
import { getStatuses } from './getStatuses.mjs';

const client = await sqliteTelegramClient('./accs/+79118453479.json', './accs/+79118453479.session');

await addContacts(client, './userList.txt', 20);
await getStatuses(client);
