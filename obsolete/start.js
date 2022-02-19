const { Api, TelegramClient } = require('telegram');
const { StoreSession } = require('telegram/sessions');
const { AuthKey } = require('telegram/crypto/AuthKey');
const input = require('input'); // npm i input
const fs = require('fs');

const { getFileName, getFilePath, getUserName, formatUserStatus } = require('./utils/formatUtils');
const { createFile, appendToFile, fileExist } = require('./utils/fileUtils');

const apiId = 2040;
const apiHash = 'b18441a1ff607e10a989891a5462e627';

const session = new StoreSession('my_session');

/* session.setAuthKey(
    new AuthKey(
        new Buffer(
            '145,189,218,255,241,215,224,124,196,37,245,255,138,79,199,114,163,144,3,89,240,222,44,149,23,187,113,164,131,70,45,150,225,68,70,80,212,97,236,119,245,83,70,44,42,105,126,151,120,123,143,135,20,204,57,136,44,233,113,173,166,99,81,145,27,82,148,2,133,137,99,72,43,84,8,203,224,142,145,240,116,92,188,99,9,200,118,29,100,115,142,8,120,178,161,139,210,41,4,99,225,57,160,22,66,82,184,15,243,116,85,97,208,148,49,113,83,48,216,48,60,45,69,197,138,191,246,124,249,122,29,72,134,114,160,128,132,192,146,189,23,88,230,1,76,111,70,61,70,44,46,103,194,158,251,40,27,41,235,87,120,201,91,192,239,115,139,110,215,168,214,220,128,92,103,252,1,128,147,117,61,34,80,92,250,142,185,60,227,48,5,40,155,242,163,216,140,255,122,248,39,139,226,3,132,211,160,215,151,77,250,40,225,216,211,162,9,117,207,237,29,128,114,179,243,242,55,173,53,234,107,80,68,77,155,87,75,129,250,103,135,123,226,47,94,239,181,187,50,230,226,96,65,118,144,13'
        )
    )
);
session.setDC(2, '149.154.167.51', 443); */

const client = new TelegramClient(session, apiId, apiHash, {});

async function sessionConnect() {
    await client.connect();

    console.log('connected...');

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

    /*   const phones = fs.readFileSync('./userList.txt').toString().split('\n');

    const contacts = phones.map((number) => {
        const generatedId = Math.trunc(Math.random() * 10000000);
        return new Api.InputPhoneContact({
            clientId: generatedId,
            phone: number,
            firstName: 'name' + generatedId,
            lastName: 'lastName' + generatedId,
        });
    });

    for (let contact of contacts) {
        console.log(`Adding contact with number ${contact.phone}...`);
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
    } */
}

sessionConnect();

/* (async () => {
    console.log('Loading interactive example...');
    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });
    await client.start({
        phoneNumber: async () => await input.text('Please enter your number: '),
        password: async () => await input.text('Please enter your password: '),
        phoneCode: async () => await input.text('Please enter the code you received: '),
        onError: (err) => {
            console.log(err);
        },
    });
    console.log('You should now be connected.');
    fs.appendFileSync('session.txt', client.session.save());
    console.log(client.session.save()); // Save this string to avoid logging in again
    await client.sendMessage('me', { message: 'Hello!' });
})(); */
