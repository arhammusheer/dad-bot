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
    });
  }

  randomJoke() {
    return jokes[Math.floor(Math.random() * jokeLength)];
  }

  async run(msg) {
    return msg.channel.send(this.randomJoke());
  }
};
