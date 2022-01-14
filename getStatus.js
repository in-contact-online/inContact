const fs = require("fs");
const { Api, TelegramClient } = require("telegram");
const { stringSession, Auth, apiHash, apiId } = require("./auth");
const client = new TelegramClient(stringSession, apiId, apiHash, {});
const CronJob = require("cron").CronJob;

async function statuses() {
  const { users } = await client.invoke(new Api.contacts.GetContacts({}));

  for (let user of users) {
    const name = `${user.firstName} ${
      user.lastName ? user.lastName : ""
    }`.trim();
    const row = `${user.phone},${name},${user.username},${user.status.wasOnline}\r\n`;

    fs.appendFile(`./users/${name}.csv`, row, (err) =>
      console.log(
        err
          ? err
          : `${new Date().toISOString()}: "${name}" written successfully`
      )
    );
  }
}

(async function run() {
  await Auth();
  await client.connect();
})();

const job = new CronJob(
  "*/5 * * * *",
  async function () {
    await statuses();
  },
  null,
  true,
  null
);

job.start();
