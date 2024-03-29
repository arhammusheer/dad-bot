const { Command } = require("discord.js-commando");
const path = require("path");

const jokes = require(path.join(__dirname, "../../", "content", "joke.json"));
const jokeLength = Object.keys(jokes).length;

module.exports = class JokeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "joke",
      aliases: ["funny"],
      group: "fun",
      memberName: "joke",
      description: "Displays a random dad joke",
      examples: ["joke"],
      throttling: {
        usages: 1,
        duration: 3,
      },
    });
  }

  logging(msg) {
    if (msg.guild)
      return console.info(`Dad joke invoked in ${msg.guild} by${msg.author}`);
    return console.info(
      `Dad joke invoked in ${msg.author.username}#${msg.author.discriminator} DM`
    );
  }

  randomJoke() {
    return jokes[Math.floor(Math.random() * jokeLength)];
  }

  async run(msg) {
    this.logging(msg);

    return msg.channel.send(this.randomJoke());
  }
};
