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
    });
  }

  randomPickup() {
    return pickup[Math.floor(Math.random() * pickupLength)];
  }

  async run(msg) {
    return msg.channel.send(this.randomPickup());
  }
};
