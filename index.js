const { CommandoClient } = require("discord.js-commando");

const path = require("path");

const config = require("./config");

const client = new CommandoClient({
  commandPrefix: config.prefix,
  owner: config.owner,
  invite: config.invite,
});

client.registry
  .registerDefaultTypes()
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerGroups([["fun", "A group of fun commands"]])
  .registerCommandsIn(path.join(__dirname, "./commands"));

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.user.setActivity("with your mom");
});

client.on("error", console.error);

client.login(config.token);
