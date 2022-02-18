import { addContacts } from './addContacts.mjs';
import { sqliteTelegramClient } from './sqliteTelegramClient.mjs';
import { getStatuses } from './getStatuses.mjs';

const client = await sqliteTelegramClient('./accs/+79858679537.json', './accs/+79858679537.session');
await addContacts(client, './userList.txt', 40);
//await getStatuses(client);
