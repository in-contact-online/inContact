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

    await client.connect(client);
    console.log('connected...');

    for (let contact of contacts) {
        console.log(`Adding contact with number ${contact.phone}...`);
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
                    console.log(error);
                }
            })
            .catch((e) => console.log(e));

        await new Promise((resolve) => {
            console.log(`Waiting for ${delay} seconds...`);
            setTimeout(() => resolve(), delay * 1000);
        });
    }
}
