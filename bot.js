require("dotenv").config();
const Discord = require("discord.js");
const { name, prefix } = require("./config.json");
const dadContent = require("./content.json");
const fetch = require("node-fetch");

const jokeLength = Object.keys(dadContent.joke).length;
const pickupLength = Object.keys(dadContent.pickup).length;
const goodJokeLength = Object.keys(dadContent.goodJoke).length;

const classicResponseTriggers = ["imma ", "i am ", "i'm ", "im "];

const bot = new Discord.Client();

//Once bot logs in
bot.once("ready", () => {
  console.log(`${name} is logged into discord servers`);
});

//On discord message
bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (
    message.content.toLowerCase().startsWith("i'm, i'm") ||
    message.content.toLowerCase().startsWith("i'm i'm") ||
    message.content.toLowerCase().startsWith("im im")
  ) {
    if (message.guild) {
      console.log(
        `Classic dad response rickroll in ${message.guild.name} with guild ID ${message.guild.id}`
      );
    } else {
      console.log(
        `Classic dad response rickroll in ${message.author.username}'s DM`
      );
    }
    return message.channel.send(`Bich You can't fool me`);
  }
  if (Math.random() <= 0.3) {
    classicResponseTriggers.some((response) => {
      if (message.content.toLowerCase().startsWith(response)) {
        if (message.content.toLowerCase().split(" ").length < 10) {
          if (
            message.content.toLowerCase().substring(response.length) ==
              "father" ||
            message.content.toLowerCase().substring(response.length) ==
              "daddy" ||
            message.content.toLowerCase().substring(response.length) == "dad" ||
            message.content.toLowerCase().substring(response.length) ==
              "dad-bot" ||
            message.content.toLowerCase().substring(response.length) ==
              "dad bot"
          ) {
            if (message.guild) {
              console.log(
                `Classic dad response comeback in ${message.guild.name} with guild ID ${message.guild.id}`
              );
              return message.channel.send(`No BICH I am dad bot`);
            } else {
              console.log(
                `Classic dad response comeback in ${message.author.username}'s DM`
              );
              return message.channel.send(
                "Bruh  You do know there's no point of me tryna pull that off in DMs"
              );
            }
          }
          if (message.guild) {
            console.log(
              `Classic dad response in ${message.guild.name} with guild ID ${message.guild.id}`
            );
          } else {
            console.log(
              `Classic dad response in ${message.author.username}'s DM'`
            );
          }

          console.log(response);
          if (message.mentions.members.first()) {
            if (Math.random() <= 0.4) {
              return message.channel.send(
                `Hi ${message.content.substring(response.length)}, I'm Dad`
              );
            }
            return message.reply("Bich I ain't mentioning anyone");
          }
          return message.channel.send(
            `Hi ${message.content.substring(response.length)}, I'm Dad`
          );
        }
      }
    });
  }

  //Dad bot invite
  if (!message.content.toLowerCase().startsWith(prefix)) return;

  //Dad bot
  if (message.content.toLowerCase() === `${prefix} bot`) {
    return message.channel.send(
      "Yuh, say `dad help` to get help. Looks like you really need some"
    );
  }

  if (message.content.toLowerCase() == `${prefix} invite`) {
    if (message.guild) {
      console.log(
        `Dad invite sent in ${message.guild.name}  with guild ID ${message.guild.id}`
      );
    } else {
      console.log(`Dad invite sent in ${message.author.username}'s DM`);
    }

    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Invite ${name} to your server`)
        .setURL(process.env.DISCORD_INVITE_LINK)
    );
  }

  //Dad jokes
  if (message.content.toLowerCase() == `${prefix} joke`) {
    dadJoke = dad_joke();
    if (message.guild) {
      console.log(
        `dad joke in ${message.guild.name} with guild ID ${message.guild.id}`
      );
    } else {
      console.log(`dad joke in ${message.author.username}'s DM`);
    }

    console.log(`Dad joke was: ${dadJoke}`);
    return message.channel.send(dadJoke);
  }

  //Dad pickup lines
  if (message.content.toLowerCase() == `${prefix} pickup`) {
    dadPickup = dad_pickup();
    if (message.guild) {
      console.log(
        `dad pickup in ${message.guild.name} with guild ID ${message.guild.id}`
      );
    } else {
      console.log(`dad pickup in ${message.author.username}'s DM`);
    }

    console.log(`Dad pickup was: ${dadPickup}`);
    return message.channel.send(dadPickup);
  }

  if (message.content.toLowerCase() == `${prefix} roast`) {
    fetch(process.env.INSULT_API_URL)
      .then((res) => res.json())
      .then((data) => {
        roast = data.insult;
        if (message.guild) {
          console.log(
            `dad roast in ${message.guild.name} with guild ID ${message.guild.id}`
          );
        } else {
          console.log(`dad roast in ${message.author.username}'s DM`);
        }

        console.log(`Dad roast was: ${roast}`);
        message.channel.send(roast);
      });
  }

  //Dad help
  if (message.content.toLowerCase() == `${prefix} help`) {
    message.channel.send(
      new Discord.MessageEmbed().setTitle("Dad bot help").addFields(
        { name: "Prefix", value: "dad" },
        {
          name: "Commands",
          value: "`joke`, `pickup`, `roast`, `help`, `good joke`",
        }
      )
    );
  }
  if (message.content.toLowerCase() == `${prefix} good joke`) {
    goodJoke = dad_good_joke();
    if (message.guild) {
      console.log(
        `dad good joke in ${message.guild.name} with guild ID ${message.guild.id}`
      );
    } else {
      console.log(`dad good joke in ${message.author.username}'s DM`);
    }

    console.log(`Dad pickup was: ${goodJoke}`);
    return message.channel.send(goodJoke);
  }
});

bot.on("guildCreate", (guild) => {
  console.log(`Joined a new guild: ${guild.name} with ID ${guild.id}`);
});

bot.ws.on("INTERACTION_CREATE", async (interaction) => {
  //Dad joke
  if (interaction.data.name == "joke") {
    bot.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: dad_joke(),
        },
      },
    });
  }
  //Dad pickup
  if (interaction.data.name == "pickup") {
    bot.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: dad_pickup(),
        },
      },
    });
  }

  //Dad Invite
  if (interaction.data.name == "invite") {
    bot.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: dad_invite(),
        },
      },
    });
  }

  //Dad roast
  if (interaction.data.name == "roast") {
    fetch(process.env.INSULT_API_URL)
      .then((res) => res.json())
      .then((data) => {
        roast = data.insult;

        bot.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: roast,
            },
          },
        });
      });
  }
  if (interaction.data.name == "good joke") {
    bot.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: dad_good_joke(),
        },
      },
    });
  }
});

//Log into discord
bot.login(process.env.DISCORD_TOKEN);

function dad_joke() {
  jokeId = Math.floor(Math.random() * jokeLength) + 1;
  dadJoke = dadContent.joke[jokeId];
  return dadJoke;
}

function dad_pickup() {
  pickupId = Math.floor(Math.random() * pickupLength) + 1;
  dadPickup = dadContent.pickup[pickupId];
  return dadPickup;
}

async function dad_roast() {
  await fetch(process.env.INSULT_API_URL)
    .then((res) => res.json())
    .then((data) => {
      roast = data.insult;
      return roast;
    });
}

function dad_good_joke() {
  goodJokeId = Math.floor(Math.random() * goodJokeLength) + 1;
  goodJoke = dadContent.goodJoke[goodJokeId];
  return goodJoke;
}

function dad_invite() {
  return process.env.DISCORD_INVITE_LINK;
}
