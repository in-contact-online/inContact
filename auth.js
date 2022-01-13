const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");

const apiId = 14096030;
const apiHash = "e397be63f6902a716dd689e844c27638";
const strSession = "";
//1AgAOMTQ5LjE1NC4xNjcuNTABu1R3PUo8wiae4XAcyjZasBW1N7wwLchM9rsx0esj2skH+JD5ZSomD0nZ9sAK0SLaWjtJdlbLeICN9WJDl/xINnirzdvGxbezryRWTY7bW0L0SdQn3acxLQ85y8UQcnSH6simjAvKKnFGMEb76k5v6dlmYPrguGF0sH6OOyiOTABp7o5QPUhT/X7VXNCc9WK8XM87WTqL7e0GOhgX6owFrtZOTxaQcOzrAJefhM/ZVkG/SpTFo3w+udO1882m/NRNtv98fRGmk0XZYuvdQxBEPLF7A7slecLkO60GVqg1TY66OGUK5zCplJ9OikoryW1JzStHhP+KfOFSqY8W3VpPsWs=
const stringSession = new StringSession(strSession); // fill this later with the value from session.save()


async function Auth() {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.connect();
  console.log("You should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again
  await client.sendMessage("me", { message: "Hello!" });
}

module.exports.apiId = apiId;
module.exports.apiHash = apiHash;
module.exports.stringSession = stringSession;
module.exports.Auth = Auth;
