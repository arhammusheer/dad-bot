require("dotenv").config();

let config = {
  name: "dad bot",
  prefix: "dad ",
  owner: process.env.OWNER_ID,
  invite: process.env.INVITE_LINK,
  token: process.env.DISCORD_TOKEN,
  prod_token: null,
};

if (process.env.PROD_DISCORD_TOKEN)
  config.prod_token = process.env.PROD_DISCORD_TOKEN;

module.exports = config;
