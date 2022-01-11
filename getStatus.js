const { Api, TelegramClient } = require("telegram");
const { stringSession, Auth, apiHash, apiId } = require("./auth");

const client = new TelegramClient(stringSession, apiId, apiHash, {});

(async function run() {
  await Auth();
  await client.connect();

  const result = await client.invoke(new Api.contacts.GetStatuses({}));
  console.log(result); // prints the result
})();
