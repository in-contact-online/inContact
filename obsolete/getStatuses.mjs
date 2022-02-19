import { Api } from 'telegram';

import { getFileName, getFilePath, getUserName, formatUserStatus } from './utils/formatUtils.mjs';
import { createFile, appendToFile, fileExist } from './utils/fileUtils.mjs';

export async function getStatuses(client) {
    await client.connect(client);
    console.log('connected...');

    let { users } = await client.invoke(new Api.contacts.GetContacts({}));

    for (let user of users) {
        const name = getUserName(user);
        const filePath = getFilePath(getFileName(name));
        const status = formatUserStatus(user);

        if (!fileExist(filePath)) {
            await createFile(filePath, status);
        } else {
            await appendToFile(filePath, status);
        }
    }
}
