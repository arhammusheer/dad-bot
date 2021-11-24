const Discord = require("discord.js");
const client = new Discord.Client();
const BOT_TOKEN =
  process.env.PROD == "true"
    ? require("../config.js").prod_token
    : require("../config.js").token;

// Name all guilds bot is in
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.guilds.cache.forEach((guild) => {
    console.log(`${guild.name} (${guild.id})`);
  });

  // Disconnect
  client.destroy();
  //End program
  // process.exit(0);
});

// Connect to Discord
client.login(BOT_TOKEN);
