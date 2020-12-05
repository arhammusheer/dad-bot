require("dotenv").config();
const Discord = require("discord.js");
const { name, prefix } = require("./config.json");
const dadContent = require("./content.json");

const jokeLength = Object.keys(dadContent.joke).length;

const bot = new Discord.Client();

//Once bot logs in
bot.once("ready", () => {
	console.log(`${name} is logged into discord servers`);
});

//On discord message
bot.on("message", (message) => {
	//Dad's classic response
	if (message.content.toLowerCase().startsWith("i'm ")) {
		console.log(
			`Classic dad response in ${message.guild.name} with guild ID ${message.guild.id}`,
		);
		return message.channel.send(`Hi ${message.content.substring(4)}, I'm Dad`);
	}

	//Dad bot invite
	if (!message.content.toLowerCase().startsWith(prefix)) return;

	if (message.content.toLowerCase() == `${prefix} invite`) {
		console.log(
			`Dad invite sent in ${message.guild.name}  with guild ID ${message.guild.id}`,
		);
		return message.channel.send(
			new Discord.MessageEmbed()
				.setTitle(`Invite ${name} to your server`)
				.setURL(process.env.DISCORD_INVITE_LINK),
		);
	}

	//Dad jokes
	if (message.content.toLowerCase() == `${prefix} joke`) {
		jokeId = Math.floor(Math.random() * jokeLength) + 1;
		dadJoke = dadContent.joke[jokeId];
		console.log(
			`dad joke in ${message.guild.name} with guild ID ${message.guild.id}`,
		);
		console.log(`Dad joke was: ${dadJoke}`);
        return message.channel.send(dadContent.joke[jokeId]);
	}
});

//Log into discord
bot.login(process.env.DISCORD_TOKEN);
