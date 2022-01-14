const fs = require("fs");
const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const CronJob = require("cron").CronJob;

const apiId = 12913782;
const apiHash = "f801042c2acb3c1a3ab66899bb2e6561";
const stringSession = new StringSession(
  "1AgAOMTQ5LjE1NC4xNjcuNTABuzODIMY60dNbPJQ2w0NHePYEup6tRLcuoqMtRK+hBAV8JWTskcVSqtrie/YuKeh2zCkh/u66F3GVSZt/WeYRUo6sK8TvZDglSzn0l3hHts4zmLo996PomMWDDQWS7wBpweh36rL/MV4Xb1ucsoArSdg3AZvQhQxhSm8vnaXd4WQCnUzclsearAJ3MfMdoV9Ip/bWQAYR84YofPPJYWHCvoZPIGSPHGfxyWBQQ2hFTL0ZXDvlaipsSdRO3vr8R4H6Yt+HR3Qdn98lWNxmXF4llqZOYub3yvnQhaSRleNGsribaXNnUiusuMQXVRFVlR3mzxXCqLFDWL/EhL8+Uy6Q4DQ="
);

const client = new TelegramClient(stringSession, apiId, apiHash, {});

async function statuses() {
  console.log("Connection...");
  await client.connect();

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
