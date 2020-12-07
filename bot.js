require("dotenv").config();
const Discord = require("discord.js");
const { name, prefix } = require("./config.json");
const dadContent = require("./content.json");
const fetch = require("node-fetch");

const jokeLength = Object.keys(dadContent.joke).length;
const pickupLength = Object.keys(dadContent.pickup).length;
const classicResponseTriggers = ["i am", "i'm", "im"];

const bot = new Discord.Client();

//Once bot logs in
bot.once("ready", () => {
	console.log(`${name} is logged into discord servers`);
});

//On discord message
bot.on("message", (message) => {
	if (
		message.content.toLowerCase().startsWith("i'm, i'm") ||
		message.content.toLowerCase().startsWith("i'm i'm")
	) {
		console.log(
			`Classic dad response rickroll in ${message.guild.name} with guild ID ${message.guild.id}`,
		);
		return message.channel.send(`Bich You can't fool me`);
	}
	classicResponseTriggers.some((response) => {
		if (message.content.toLowerCase().startsWith(response)) {
			if (message.content.toLowerCase().split(" ").length < 10) {
				if (message.content.toLowerCase().substring(response.length + 1) == "dad"||message.content.toLowerCase().substring(response.length + 1) == "dad-bot") {
					console.log(
						`Classic dad response comeback in ${message.guild.name} with guild ID ${message.guild.id}`,
					);
					return message.channel.send(
						`No BICH I am dad bot`,
					);
				}
				console.log(
						`Classic dad response in ${message.guild.name} with guild ID ${message.guild.id}`,
					);
				console.log(response);
				return message.channel.send(
					`Hi ${message.content.substring(response.length+1)}, I'm Dad`,
				);
			}
		}
	});
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
		return message.channel.send(dadJoke);
	}

	//Dad pickup lines
	if (message.content.toLowerCase() == `${prefix} pickup`) {
		pickupId = Math.floor(Math.random() * pickupLength) + 1;
		dadPickup = dadContent.pickup[pickupId];
		console.log(
			`dad pickup in ${message.guild.name} with guild ID ${message.guild.id}`,
		);
		console.log(`Dad pickup was: ${dadPickup}`);
		return message.channel.send(dadPickup);
	}

	if (message.content.toLowerCase() == `${prefix} roast`) {
		fetch(process.env.INSULT_API_URL)
			.then((res) => res.json())
			.then((data) => {
				roast = data.insult;
				console.log(
					`dad roast in ${message.guild.name} with guild ID ${message.guild.id}`,
				);
				console.log(`Dad roast was: ${roast}`);
				message.channel.send(roast);
			});
	}
});

bot.on("guildCreate", (guild) => {
	console.log(`Joined a new guild: ${guild.name} with ID ${guild.id}`);
});

//Log into discord
bot.login(process.env.DISCORD_TOKEN);
