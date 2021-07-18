require("dotenv").config();

const config = {
  name: "dad bot",
  prefix: "dad ",
  owner: process.env.OWNER_ID,
  invite: process.env.INVITE_LINK,
  token: process.env.DISCORD_TOKEN,
};

module.exports = config;
