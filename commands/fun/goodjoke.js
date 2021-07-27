const { MessageEmbed } = require("discord.js");
const { Command } = require("discord.js-commando");
const path = require("path");

const goodJoke = require(path.join(
  __dirname,
  "../../",
  "content",
  "goodjoke.json"
));
const goodJokeLength = Object.keys(goodJoke).length;

module.exports = class GoodJokeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "goodjoke",
      aliases: ["good-joke", "nice-joke", "good joke"],
      group: "fun",
      memberName: "goodjoke",
      description: "A slightly offensive joke",
      examples: ["goodjoke"],
      throttling: {
        usages: 1,
        duration: 3,
      },
    });
  }

  randomGoodJoke() {
    return goodJoke[Math.floor(Math.random() * goodJokeLength)];
  }

  logging(msg) {
    if (msg.guild) return console.info(`Dad joke invoked in ${msg.guild}`);
    return console.info(
      `Dad joke invoked in ${msg.author.username}#${msg.author.discriminator} DM`
    );
  }

  async run(msg) {
    const embed = new MessageEmbed();
    this.logging(msg);
    embed.setTitle("A good joke").setDescription(this.randomGoodJoke());
    return msg.channel.send(embed);
  }
};
