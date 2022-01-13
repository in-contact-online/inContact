const fs = require('fs');
const { Api, TelegramClient } = require("telegram");
const { stringSession, Auth, apiHash, apiId } = require("./auth");
const client = new TelegramClient(stringSession, apiId, apiHash, {});
const CronJob = require('cron').CronJob;


async function statuses() {
  const { users } = await client.invoke(new Api.contacts.GetContacts({}));

  const result = users.map((user) => ({
    phone: user.phone,
    name: user.firstName + user.lastName,
    username: user.username,
    status: user.status
  }))
  const fileName = `statuses_${new Date().toISOString()}.json`;

  fs.writeFile(fileName, JSON.stringify(result), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully");
    }
  }); // prints the result
}

(async function run() {
  await Auth();
  await client.connect();
})();

const job = new CronJob('*/10 * * * *', async function() {
  await statuses();
}, null, true, null);

job.start();
