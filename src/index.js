const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const fs = require("fs");

// Path where the session data will be stored
const SESSION_FILE_PATH = "../session.json";

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
  session: sessionData,
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (message) => {
  console.log("new message");

  console.log(message.body);
  let re = "(?=.*comigo)(?=.*morreu)";

  const result = message.body.toLowerCase().match(re);

  console.log(result);

  if (result) {
    console.log("alguem disse comigo morreu");
    message.reply("[BOT] comigo morreu");
  }
});

client.on("authenticated", (session) => {
  sessionData = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    if (err) {
      console.error(err);
    }
  });
});

client.initialize();
