import fs from 'fs';
import { Api } from 'telegram';

export async function addContacts(client, contacts_path, delay) {
    const phones = fs.readFileSync(contacts_path).toString().split('\n');

    const contacts = phones.map((number) => {
        const generatedId = Math.trunc(Math.random() * 10000000);
        return new Api.InputPhoneContact({
            clientId: generatedId,
            phone: number,
            firstName: 'name' + generatedId,
            lastName: 'lastName' + generatedId,
        });
    });

    let countErrors = 0;

    await client.connect(client);
    console.log('connected...');

    for (let contact of contacts) {
        console.log(`Client ${client.data.phone}: Adding contact with number ${contact.phone}...`);
        await client
            .invoke(
                new Api.contacts.ImportContacts({
                    contacts: [contact],
                })
            )
            .then((data) => {
                try {
                    let addedPhone = data.users[0].phone;
                    console.log(`Contact with phone number ${addedPhone} has beed added!`);
                } catch (error) {
                    countErrors++;
                    console.log(`Not added. Error count: ${countErrors}`);
                }
            })
            .catch((e) => console.log(e));

        if (countErrors > 2) break;

        await new Promise((resolve) => {
            console.log(`Waiting for ${delay} seconds...`);
            setTimeout(() => resolve(), delay * 1000);
        });
    }
}
