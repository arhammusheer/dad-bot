const { Command } = require("discord.js-commando");

module.exports = class Joke extends Command {
	constructor(client) {
		super(client, {
			name: "joke",
			group: "fun",
			memberName: "joke",
			description: "Displays a random joke",
			examples: ["joke"]
		});
	}

	run(msg) {
		msg.channel.send("https://icanhazdadjoke.com/");
	}
}