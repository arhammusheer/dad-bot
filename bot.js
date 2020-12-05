require("dotenv").config;
const Discord = require("discord.js");
const config = require("./config.json");

const bot = new Discord.client();

bot.once("ready", () => {
	console.log();
});

//Log into discord
bot.login(process.env.DISCORD_TOKEN);
