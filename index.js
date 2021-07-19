const { CommandoClient } = require("discord.js-commando");

const path = require("path");

const config = require("./config");

const client = new CommandoClient({
  commandPrefix: config.prefix,
  owner: config.owner,
  invite: config.invite,
});

client.once("ready", () => {
  client.registry
    .registerGroups([["fun", "fun commands"]])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, "commands"));

  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.user.setActivity("with your mom");
});

client.on("message", (message) => {
  if (message.author.bot) return;

  if (
    message.content.toLowerCase().startsWith("i'm, i'm") ||
    message.content.toLowerCase().startsWith("i'm i'm") ||
    message.content.toLowerCase().startsWith("im im")
  ) {
    
  }
});

client.on("error", console.error);

client.login(config.token);
