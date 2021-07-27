const { Command } = require("discord.js-commando");

module.exports = class InviteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      group: "util",
      memberName: "invite",
      description: "Sends you the invite link for this bot",
      examples: ["invite"],
    });
  }

  run(msg) {
    return msg.reply(`Use this link to invite me to your server: 
		
https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot+applications.commands&permissions=2048
		`);
  }
};
