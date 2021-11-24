const BOT_TOKEN =
  process.env.PROD == "true"
    ? require("../config.js").prod_token
    : require("../config.js").token;

const axios = require("axios");

Array.prototype.subarray = function (start, end) {
  if (!end) {
    end = -1;
  }
  return this.slice(start, this.length + 1 - end * -1);
};

const GUILD_ID = process.argv[2];
const INFO_LEVEL = process.argv.subarray(3); // what to show

if (!GUILD_ID) {
  console.log("\x1b[31m", "Please provide a guild id", "\x1b[0m");
  send_help();
  process.exit(1);
}

if (!INFO_LEVEL.length) {
  console.log("\x1b[31m", "Please provide at least one info level", "\x1b[0m");
  send_help();
  process.exit(1);
}

const URL = `https://discord.com/api/v9/guilds/${GUILD_ID}/channels`;

axios
  .get(URL, {
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
    },
  })
  .then((res) => {
    const channels = res.data.map((channel) => {
      // Analyze channel type
      if (channel.type == 0) {
        channel.type = "text";
      } else if (channel.type == 2) {
        channel.type = "voice";
      } else if (channel.type == 4) {
        channel.type = "category";
      } else if (channel.type == 5) {
        channel.type = "news";
      } else if (channel.type == 6) {
        channel.type = "store";
      } else if (channel.type == 10) {
        channel.type = "guild news thread";
      } else if (channel.type == 11) {
        channel.type = "announcements";
      }

      let return_info = {};

      if (INFO_LEVEL[0] == "all") return channel;

      INFO_LEVEL.forEach((info) => {
        if (Object.keys(channel).includes(info)) {
          return_info[info] = channel[info];
        }
      });

      return return_info;
    });

    // Sort channels by position
    channels.sort((a, b) => {
      return a.position - b.position;
    });

    console.log(channels);
  });

function send_help() {
  console.log(`
		Usage: node info/list-channels.js <guild_id> <info_level>

		<guild_id> is the id of the discord guild you want to get info about
		<info_level> is a list of info levels you want to get, separated by spaces

		info levels:
			id: the id of the channel
			name: the name of the channel
			type: the type of the channel
			position: the position of the channel
			topic: the topic of the channel
			bitrate: the bitrate of the channel
			user_limit: the user limit of the channel
			permission_overwrites: the permission overwrites of the channel
			parent_id: the id of the parent of the channel
			nsfw: whether the channel is nsfw or not
			last_message_id: the id of the last message in the channel
			last_pin_timestamp: the timestamp of the last pin in the channel
			rate_limit_per_user: the rate limit per user of the channel

			all: all of the above 

		Example: node info/list-channels.js 547897349857001472 id name
			
	`);
}
