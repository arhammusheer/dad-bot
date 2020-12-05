require("dotenv").config();
const Discord = require("discord.js");
const config = require("./config.json");

const bot = new Discord.Client();

//Once bot logs in
bot.once("ready", () => {
	console.log(`${config.name} is logged into discord servers`);
});

//On discord message
bot.on("message", (message) => {
	if (message.content.toLowerCase().startsWith("i'm "))
		return message.channel.send(`Hi ${message.content.substring(4)}, I'm Dad`);
});

//Log into discord
bot.login(process.env.DISCORD_TOKEN);
