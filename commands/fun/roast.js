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

  async roast() {
    const response = await axios.get(process.env.INSULT_API_URL);
    return response.data.insult;
  }

  async run(msg, {user}) {
    const message = await this.roast();
    return msg.channel.send(`<@${user.id}> ${message}`);
  }
};
