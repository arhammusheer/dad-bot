require("dotenv").config();
const Discord = require("discord.js");

const bot = new Discord.Client();

GUILD_ID = toString(process.env.BOT_HOME_GUILD);

bot.once("ready", () => {
  console.log("setting up slash commands");

  // Dad joke command
  bot.api
    .applications(bot.user.id)
    .guilds(GUILD_ID)
    .commands.post({
      data: {
        name: "joke",
        description: "A sorta funny dad joke",
      },
    });

  // Dad roast command
  bot.api
    .applications(bot.user.id)
    .guilds(GUILD_ID)
    .commands.post({
      data: {
        name: "roast",
        description: "A dad roast which will probably destroy you",
      },
    });

  // Dad pickup lines
  bot.api
    .applications(bot.user.id)
    .guilds(GUILD_ID)
    .commands.post({
      data: {
        name: "pickup",
        description: "A very cheesy dad pickup line on demand",
      },
    });

  // Dad pickup lines
  bot.api
    .applications(bot.user.id)
    .guilds(GUILD_ID)
    .commands.post({
      data: {
        name: "invite",
        description: "Dad bot's invite link",
      },
    });

  // Dad good jokes
  bot.api
    .applications(bot.user.id)
    .guilds(GUILD_ID)
    .commands.post({
      data: {
        name: "good joke",
        description: "Slightly better than a dad joke",
      },
    });

  console.log("Setup complete");
  process.exit(0);
});

bot.login(process.env.DISCORD_TOKEN);
