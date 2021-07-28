const { default: axios } = require("axios");
const { Command } = require("discord.js-commando");

module.exports = class RoastCommand extends Command {
  constructor(client) {
    super(client, {
      name: "roast",
      group: "fun",
      memberName: "roast",
      description: "Roasts a user.",
      throttling: {
        usages: 1,
        duration: 3,
      },
      args: [
        {
          key: "user",
          prompt: "What user would you like to roast?",
          type: "user",
        },
      ],
    });
  }

  logging(msg) {
    if (msg.guild)
      return console.info(`Dad roast invoked in ${msg.guild} by${msg.author}`);
    return console.info(
      `Dad roast invoked in ${msg.author.username}#${msg.author.discriminator} DM`
    );
  }

  async roast() {
    const response = await axios.get(process.env.INSULT_API_URL);
    return response.data.insult;
  }

  async run(msg, { user }) {
    this.logging(msg);

    if (user.id === this.client.user.id)
      return msg.reply("Bich i ain't doing that.");
    if (user.id === msg.author.id)
      return msg.reply("You really wanna roast yourself?");

    const message = await this.roast();
    return msg.channel.send(`<@${user.id}> ${message}`);
  }
};
