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

  console.info(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.user.setActivity("with your mom");
});

const classicResponseTriggers = ["imma ", "i am ", "i'm ", "im "];

client.on("message", (message) => {
  if (message.author.bot) return;
  if (
    message.content.toLowerCase().startsWith("i'm, i'm") ||
    message.content.toLowerCase().startsWith("i'm i'm") ||
    message.content.toLowerCase().startsWith("im im")
  ) {
    return message.channel.send("No fooling me bich");
  }
  classicResponseTriggers.some((response) => {
    if (message.content.toLowerCase().startsWith(response)) {
      if (message.content.toLowerCase().split(" ").length < 10) {
        if (
          message.content.toLowerCase().substring(response.length) ==
            "father" ||
          message.content.toLowerCase().substring(response.length) == "daddy" ||
          message.content.toLowerCase().substring(response.length) == "dad" ||
          message.content.toLowerCase().substring(response.length) ==
            "dad-bot" ||
          message.content.toLowerCase().substring(response.length) == "dad bot"
        ) {
          if (message.guild) {
            console.info(
              `Classic dad response comeback in ${message.guild.name} with guild ID ${message.guild.id}`
            );
            return message.channel.send(`No BICH I am dad bot`);
          } else {
            console.info(
              `Classic dad response comeback in ${message.author.username}'s DM`
            );
            return message.channel.send(
              "Bruh  You do know there's no point of me tryna pull that off in DMs"
            );
          }
        }
        if (message.guild) {
          console.info(
            `Classic dad response in ${message.guild.name} with guild ID ${message.guild.id}`
          );
        } else {
          console.info(
            `Classic dad response in ${message.author.username}'s DM'`
          );
        }

        console.info(response);
        if (message.mentions.members.first()) {
          if (Math.random() <= 0.4) {
            return message.channel.send(
              `Hi ${message.content.substring(response.length)}, I'm Dad`
            );
          }
          return message.reply("Bich I ain't mentioning anyone");
        }
        return message.channel.send(
          `Hi ${message.content.substring(response.length)}, I'm Dad`
        );
      }
    }
  });
});

client.on("error", console.error);

client.login(config.token);
