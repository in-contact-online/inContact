const { Api, TelegramClient, Connection } = require('telegram');
const { StringSession } = require('telegram/sessions');
const CronJob = require('cron').CronJob;
const { config } = require('./config');
const { getFileName, getFilePath, getUserName, formatUserStatus } = require('./utils/formatUtils');
const { createFile, appendToFile, fileExist } = require('./utils/fileUtils');
const fs = require('fs');

async function statuses() {
    //Prepare contacts for import
    const phones = fs.readFileSync('./userList.txt').toString().split('\n');

    const contacts = phones.map((number) => {
        const generatedId = Math.trunc(Math.random() * 10000000);
        return new Api.InputPhoneContact({
            clientId: generatedId,
            phone: number,
            firstName: 'name' + generatedId,
            lastName: 'lastName' + generatedId,
        });
    });

    const client = new TelegramClient(config.sessionId, config.apiId, config.apiHash, {});
    await client.connect();

    for (let contact of contacts) {
        await client
            .invoke(
                new Api.contacts.ImportContacts({
                    contacts: [contact],
                })
            )
            .then((data) => {
                let addedPhone = data.users[0].phone;
                if (addedPhone) {
                    console.log(`Contact with phone number ${addedPhone} has beed added!`);
                    fs.appendFileSync('contacts.txt', addedPhone + '\n');
                }
            })
            .catch((e) => console.log(e));

        await new Promise((resolve) => {
            let sec = 40;
            console.log(`Waiting for ${sec} seconds...`);
            setTimeout(() => resolve(), sec * 1000);
        });
    }

    let { users } = await client.invoke(new Api.contacts.GetContacts({}));

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
