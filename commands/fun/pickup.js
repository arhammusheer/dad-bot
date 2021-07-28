const { Command } = require("discord.js-commando");
const path = require("path");

const pickup = require(path.join(
  __dirname,
  "../../",
  "content",
  "pickup.json"
));
const pickupLength = Object.keys(pickup).length;

module.exports = class PickupCommand extends Command {
  constructor(client) {
    super(client, {
      name: "pickup",
      aliases: ["pickup-line"],
      group: "fun",
      memberName: "pickup",
      description: "A very cheesy pickup line.",
      examples: ["pickup"],
      throttling: {
        usages: 1,
        duration: 3,
      },
    });
  }

  logging(msg) {
    if (msg.guild)
      return console.info(`Dad pickup invoked in ${msg.guild} by${msg.author}`);
    return console.info(
      `Dad joke invoked in ${msg.author.username}#${msg.author.discriminator} DM`
    );
  }

  randomPickup() {
    return pickup[Math.floor(Math.random() * pickupLength)];
  }

  async run(msg) {
    this.logging(msg);

    return msg.channel.send(this.randomPickup());
  }
};
