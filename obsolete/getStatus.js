const { Api, TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const CronJob = require('cron').CronJob;
const { config } = require('./config');
const { getFileName, getFilePath, getUserName, formatUserStatus } = require('./utils/formatUtils');
const { createFile, appendToFile, fileExist } = require('./utils/fileUtils');
const fs = require('fs');

const client = new TelegramClient(new StringSession(config.sessionId), config.apiId, config.apiHash, {});

async function statuses() {
    console.log('statuses...');

    await client.connect();

    //add contacts
    const arrayOfNumbers = fs.readFileSync('./userList.txt').toString().split('\n');

    const mappedArrayOfNumbers = arrayOfNumbers.map((number) => {
        const generatedId = Math.trunc(Math.random() * 10000000);
        return new Api.InputPhoneContact({
            clientId: generatedId,
            phone: number,
            firstName: 'name' + generatedId,
            lastName: 'lastName' + generatedId,
        });
    });

    for (let item of mappedArrayOfNumbers) {
        await client
            .invoke(
                new Api.contacts.ImportContacts({
                    contacts: [item],
                })
            )
            .then((data) => console.log(JSON.stringify(data) + ' added!'))
            .catch((e) => console.log(e));

        await new Promise((resolve) => {
            setTimeout(() => resolve(), 20000);
        });
    }

    const { users } = await client.invoke(new Api.contacts.GetContacts({}));

    for (let user of users) {
        const name = getUserName(user);
        const filePath = getFilePath(getFileName(getUserName(user)));
        const status = formatUserStatus(user);

        if (!fileExist(filePath)) {
            await createFile(filePath, status);
        } else {
            await appendToFile(filePath, status);
        }
    }
}

statuses();
