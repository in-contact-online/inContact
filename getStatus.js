const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const CronJob = require("cron").CronJob;
const { config } = require('./config');
const { getFileName, getFilePath, getUserName, formatUserStatus } = require('./utils/formatUtils');
const { createFile, appendToFile, fileExist } = require('./utils/fileUtils');


const client = new TelegramClient(new StringSession(config.sessionId), config.apiId, config.apiHash, {});

async function statuses() {
  console.log("statuses...");
  await client.connect();

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

const scanStatuses = new CronJob(config.cronString, async function () { await statuses(); }, null, true, null);

module.exports = {
  scanStatuses,
}
