// he actually went to helios and liked it :)
require('dotenv').config();
const readline = require('readline');
const osu = require('node-os-utils');
const cpu = osu.cpu;
const mem = osu.mem;
const netstat = osu.netstat;
const os = require('os');
const Discord = require('discord.js');
const nodeDuck = require('node-duckduckgo');
const duckSearch = nodeDuck;
const pino = require('pino');
const ytSearch = require('youtube-search');
const url = require('inspector');
const logger = pino();
const packageJSON = require('./package.json');
module.exports = logger;
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const raccArr = ['raccoon', 'raccbot', 'trash', 'trash panda', 'egg', 'eggs', 'procyon', 'procyon lotor', '🥚', '🦝'];
const statText = ["the dumpster behind arby's", "the world create trash", "songs from my past", "you eat that yummy food", "with too little garbage", "raccoon sounds", `raccbot version ${packageJSON.version}`];
const statAct = ["COMPETING", "WATCHING", "LISTENING", "WATCHING", "PLAYING", "PLAYING", "PLAYING"];
const randomCat = ["20180821_145904.jpg", "20200923_005403.jpg", "20201209_232951.jpg", "20201209_233115.jpg", "20201213_020031.jpg", "20201220_195119.jpg", "20201224_193626.jpg", "20201224_193651.jpg", "20210122_180035.jpg", "20210204_234848.jpg", "20210325_231904.jpg", "20210405_223728.jpg", "20210531_193634.jpg", "20210620_154801.jpg", "20210714_103240.jpg"];
var opts = { maxResults: 3, key: process.env.YT_TOKEN };

function createRand(min, max) {
    var randomCalc = Math.floor(Math.random() * (max - min) + min).toString();
    return randomCalc;
}
function shutdownRacc() {
    logger.warn("exiting raccbot!");
    process.exit(0);
}

// for reading key inputs
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}
// reading key input to perform actions
process.stdin.on('keypress', (str, key) => {
    switch (key.name) {
        case 'q':
            shutdownRacc();
        case 'a':
            logger.warn("don't worry, i'm still alive");
        default:
            break;
    }
});

// the actual raccbot
client.on('ready', () => {
    logger.info('raccbot is READY to steal your trash now');
    logger.info('press Q to exit, press A to check for hang');
    client.user.setStatus('online');
    statusChange();
    setInterval(statusChange, 60000);
    function statusChange() {
        const randStatus = createRand(1, (statText.length));
        client.user.setActivity(
            statText[randStatus - 1], {
            type: statAct[randStatus - 1],
        });
    }
});
// check for chalkland member join, still works as of 10/15/2021
client.on('guildMemberAdd', member => {
    if (guild.id === '696540783385247824') {
        try {
            const channel = guild.channels.cache.find(ch => ch.name === 'non-amet');
            channel.sendTyping();
            channel.send(`Welcome to Chalkland, ${member}!`);
        } catch (error) {
            logger.warn(error);
        }
    } 
    if (guild.id === '754471441575182431') {
        try {
            const channel = guild.channels.cache.find(ch => ch.name === 'general');
            channel.sendTyping();
            channel.send(`Welcome to The Fun Haus, ${member}!`);
        } catch (error) {
            logger.warn(error);
        }
    } else {
        logger.warn(`Guild messages not set up for Guild: ${member.guild.name}!`)
    }
    channel.warn(`${member} has joined ${member.guild.name}!`);
});

client.on('guildMemberRemove', member => {
    if (guild.id === '696540783385247824') {
        try {
            const channel = guild.channels.cache.find(ch => ch.name === 'non-amet');
            channel.sendTyping();
            channel.send(`${member} has left the server.`);
        } catch (error) {
            logger.warn(error);
        }
    } 
    if (guild.id === '754471441575182431') {
        try {
            const channel = guild.channels.cache.find(ch => ch.name === 'general');
            channel.sendTyping();
            channel.send(`${member} has left the server.`);
        } catch (error) {
            logger.warn(error);
        }
    } else {
        logger.warn(`Guild messages not set up for Guild: ${member.guild.name}!`)
    }
    channel.warn(`${member} has left ${member.guild.name}`);
});

client.on("guildBanAdd", function (guild, user) {
    if (guild.id === '696540783385247824') {
        try {
            const channel = guild.channels.cache.find(ch => ch.name === 'non-amet');
            channel.sendTyping();
            channel.send(`${user} was just **banned** from ${guild.name} 👀`);
            logger.warn(`${user} was just **banned** from ${guild.name}`);
        } catch (error) {
            logger.warn(error);
        }
    } 
    if (guild.id === '754471441575182431') {
        try {
            const channel = guild.channels.cache.find(ch => ch.name === 'general');
            channel.sendTyping();
            channel.send(`${user} was just **banned** from ${guild.name} 👀`);
            logger.warn(`${user} was just **banned** from ${guild.name}`);
        } catch (error) {
            logger.warn(error);
        }
    } else {
        logger.warn(`Guild messages not set up for Guild: ${guild.name}!`)
    }

});

client.on('messageCreate', async message => {
    const raccEmoji = client.emojis.cache.find(emoji => emoji.name === 'raccmask');
    async function raccOnMessage() {
        for (let i = 0; i < raccArr.length; i++) {
            if (message.content.includes(raccArr[i]) === true) {
                try {
                    await message.react(raccEmoji);
                    logger.info(`did somebody say ${raccArr[i]}?`);
                } catch (error) {
                    logger.error(`raccEmoji in ${guild} error: ${error}`)
                }
            }
        }
    }
    if (message.author.bot) return;
    let { guild, channel } = message;
    let msgavatarurl = message.member.user.avatarURL;
    const usermsg = message.content.split(' ');
    const afterCom = usermsg.slice(1).join(' ');
    raccOnMessage();

    switch (usermsg[0]) {
        case 'racc.ping':
            message.channel.sendTyping();
            message.channel.send("Pong.");
            logger.info(`Pinging ${channel}, ${guild}`);
            break;
        case 'racc.pong':
            message.channel.sendTyping();
            message.channel.send("Ping.");
            logger.info(`Ponging ${channel}, ${guild}`);
            break;
        case 'racc.repeat':
        case 'racc.repeat.twice':
            let str = afterCom;
            message.channel.sendTyping();
            try {
                message.delete();
            } catch (error) {
                logger.error(error);
            }
            var msgSelect = Math.round(Math.random() * (3 - 0) + 1);
            switch (msgSelect) {
                case 1:
                    str = str.replace(/i am/i, "You ARE");
                    break;
                case 2:
                    str = str.replace(/i am stupid/i, "We know");
                    break;
                case 3:
                    str = str.replace(/i am/i, "I am NOT");
                    break;
                default:
                    break;
            }
            if (usermsg[0] === "racc.repeat.twice") {
                str = `${str}${str}`;
                logger.info(`Double repeat of ${message.member.user.tag} message ${afterCom} from ${channel}, ${guild}`);
            }
            else { logger.info(`Repeat of ${message.member.user.tag} message ${afterCom} from ${channel}, ${guild}`); }
            message.channel.send(str);
            break;
        case 'racc.system':
        case 'racc.helios':
            message.channel.sendTyping();
            logger.info("Sending Helios Server Data...");
            try {
                const sysInfEmbed = new Discord.MessageEmbed()
                    .setColor('#900C3F')
                    .setTitle('Helios Server Info')
                    .setURL('https://chalkland.net/raccbot')
                    .setAuthor('RaccBot', 'https://cdn.discordapp.com/app-icons/654865661691953163/0b25d03eaffd05ff289a9c956b2a5f6e.png', 'https://chalkland.net/raccbot')
                    .setDescription('system resource usage of raccbot host')
                    .addFields(
                        { name: 'Physical CPU Count:', value: `${cpu.count()}`, inline: true },
                        { name: 'CPU Usage:', value: `${await cpu.usage()}%`, inline: true },
                        { name: '\u200B', value: '\u200B' },
                        { name: 'Total Memory:', value: `${Math.round(mem.totalMem() / 1024 / 1024)} MB`, inline: true },
                        { name: 'Free Memory:', value: `${(await mem.free()).freeMemMb} MB`, inline: true },
                        { name: '\u200B', value: '\u200B' },
                        { name: 'Network Usage: (CURRENTLY BROKEN)', value: `${((await netstat.inOut()) + (await netstat.inOut())) * 1024} KB/s`, inline: true },
                        { name: 'System Uptime:', value: `${Math.round(os.uptime() / 3600)} Hours`, inline: true },
                    )
                    .setFooter(`Requested by ${message.member.user.tag}`, msgavatarurl)
                    .setTimestamp();
                message.channel.send({ embeds: [sysInfEmbed] });
                logger.info(`Finished collecting system information data, sent to ${channel}, ${guild}`);
            } catch (error) {
                logger.error(error);
            }
            break;
        case 'racc.info':
            try {
                message.channel.sendTyping();
                const depNum = JSON.stringify(packageJSON.dependencies).split(',').length;
                const infoEmbed = new Discord.MessageEmbed()
                    .setColor('#900C3F')
                    .setTitle('Information about RaccBot:')
                    .setImage("https://cdn.discordapp.com/app-icons/654865661691953163/0b25d03eaffd05ff289a9c956b2a5f6e.png")
                    .setDescription(`Currently running \`v${packageJSON.version}\`, using ${depNum} dependencies in mode \`${process.env.DEV_MODE}\``)
                    .addFields(
                        { name: "​", value: `Currently running on platform \`${process.platform}-${process.arch}\``, inline: false },
                        { name: "​", value: "Use `racc.help` for a list of commands!", inline: false },
                        { name: "​", value: "Open an issue at https://github.com/raccbot/issues if you encounter any behavior you suspect isn't correct.", inline: false },
                        { name: "​", value: "made by <@295075692620546048> with ❤️, 🧂, and a lot of 🦝", inline: false }
                    )
                    .setFooter(`Requested by ${message.member.user.tag}`, msgavatarurl)
                    .setTimestamp();
                message.channel.send({ embeds: [infoEmbed] });
            } catch (error) {
                logger.error(error);
            }
            break;
        case 'racc.commands':
        case 'racc.cmds':
        case 'racc.help':
            try {
                message.channel.sendTyping();
                const helpEmbed1 = new Discord.MessageEmbed()
                    .setColor('#900C3F')
                    .setTitle(`Commands for RaccBot:`)
                    .setDescription('PSA: This card subject to change')
                    .setThumbnail("https://cdn.discordapp.com/app-icons/654865661691953163/0b25d03eaffd05ff289a9c956b2a5f6e.png?size=512")
                    .addFields(
                        { name: 'racc.help', value: "Displays this help card with information about commands.", inline: true },
                        { name: 'racc.info', value: "Displays a card with the current version of RaccBot along with some other information.", inline: true },
                        { name: 'racc.helios / racc.system', value: "Gathers information about the system RaccBot is currently running on.", inline: true },
                        { name: 'racc.repeat `[text to be repeated]`', value: "Takes the text after the initial 'racc.repeat' and repeats it.", inline: true },
                        { name: 'racc.repeat.twice `[text to be repeated]`', value: "Same functionality as 'racc.repeat' instead sending the text twice. Example: 'racc.repeat.twice bum' Output: 'bumbum'", inline: true },
                        { name: 'racc.search `[search term]`', value: "Uses DuckDuckGo to find an instant answer, and returns a result, and a link. PSA: not all search terms will gurantee a response", inline: true },
                        { name: 'racc.yt `[search term]`', value: "Searches YouTube for the top 3 hits. Includes both Channels and Videos", inline: true },
                        { name: 'racc.dice / racc.roll `[number of sides on virtual die]`', value: "Given the number of sides to roll, a virtual die will be rolled and give you a number. If you choose 2 sides on your die, it will be interpreted as a coin flip.", inline: true },
                        { name: 'racc.cat', value: "Shows you a random picture of dnglchlk's cat.", inline: true },
                        { name: 'racc.ping / racc.pong', value: "Pretty much just sanity checks you to make sure you're connected and the bot can see and respond to you.", inline: true }
                    )
                    .setFooter(`Requested by ${message.member.user.tag}`, msgavatarurl)
                    .setTimestamp();
                message.channel.send({ embeds: [helpEmbed1] });
                logger.info(`Help embed sent to ${channel}, ${guild}`);
            } catch (error) {
                logger.error(error);
            }
            break;
        case 'racc.search.duck':
        case 'racc.search':
            try {
                if (afterCom === "") {
                    throw 'Search field cannot be null.';
                }
            } catch (error) {
                message.channel.send("Search field cannot be empty, please provide a search term.");
                return;
            }
            let searchStr = afterCom;
            message.channel.sendTyping();
            const duckResult = await duckSearch.duckIt(searchStr);
            let duckImage = `https://duckduckgo.com${duckResult.data.Image}`;
            function isValidHttpUrl(string) {
                try {
                    url = new URL(string);
                } catch (error) {
                    logger.error(error);
                    return false;
                }
                let yes = url.protocol === "http:" || url.protocol === "https:";
                return yes;
            } try {
                // Checks to see if url is valid and has the image information at the end of link.
                if (isValidHttpUrl(duckImage) == true && duckImage != 'https://duckduckgo.com') {
                    logger.info("Valid Image URL");
                } else {
                    // If above statement fails, duckduckgo icon is assigned for embed.
                    duckImage = 'https://upload.wikimedia.org/wikipedia/en/9/90/The_DuckDuckGo_Duck.png';
                }
            } catch (error) {
                logger.error(error);
            }
            async function get() {
                try {
                    const duckResultEmbed = new Discord.MessageEmbed()
                        .setColor('#900C3F')
                        .setTitle(`Instant Answer For: ${searchStr}`)
                        .setURL(duckResult.data.AbstractURL)
                        .setAuthor('DuckDuckGo', 'https://upload.wikimedia.org/wikipedia/en/9/90/The_DuckDuckGo_Duck.png', 'https://duckduckgo.com')
                        .setDescription('retrieved by RaccBot')
                        .setImage(duckImage)
                        .addFields(
                            { name: 'Answer', value: duckResult.data.AbstractText, inline: false },
                        )
                        .setFooter(`Requested by ${message.member.user.tag}`, msgavatarurl)
                        .setTimestamp();
                    logger.info(`sent to ${channel}, ${guild}`);
                    message.channel.send({ embeds: [duckResultEmbed] });
                } catch (err) {
                    logger.error(`the duck has declared an error war against your raccoon! Error:${err}`);
                    message.channel.send(`Could not retrieve or find an Instant Answer for: ${searchStr}.`);
                }
            }
            get();
            break;
        case 'racc.yt':
        case 'racc.search.yt':
            try {
                ytSearch(afterCom, opts, function (err, results) {
                    message.channel.sendTyping();
                    if (err) {
                        return logger.error(err);
                    }
                    let info1 = results[0];
                    let info2 = results[1];
                    let info3 = results[2];
                    const ytSearchEmbed = new Discord.MessageEmbed()
                        .setColor("#900C3F")
                        .setTitle(`Results for ${afterCom}:`)
                        .setDescription('YouTube Results by RaccBot')
                        .setImage(info1.thumbnails.high.url)
                        .setThumbnail("https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-6-2.png")
                        .addFields(
                            { name: info2.title.toString(), value: info2.link, inline: false },
                            { name: info3.title.toString(), value: info3.link, inline: false },
                            { name: info1.title.toString(), value: info1.link, inline: false })
                        .setFooter(`Requested by ${message.member.user.tag}`, msgavatarurl)
                        .setTimestamp();
                    message.channel.send({ embeds: [ytSearchEmbed] });
                });
            } catch (error) {
                logger.error(error);
            }
            break;
        case 'racc.cat':
            let cat = createRand(1, randomCat.length);
            let catURL = `https://chalkland.net/Pictures/cat/${randomCat[(cat - 1)]}`;
            try {
                message.channel.sendTyping();
                const catEmbed = new Discord.MessageEmbed()
                    .setColor("#900C3F")
                    .setTitle("A Random Cat")
                    .setDescription("enjoy this lovely photo of the cat")
                    .setImage(catURL)
                    .setFooter(`Requested by ${message.member.user.tag}`, msgavatarurl)
                    .setTimestamp();
                message.channel.send({ embeds: [catEmbed] })
            } catch (error) {
                logger.error(error);
            }
            break;
        case 'racc.dice':
        case 'racc.roll':
            try {
                message.channel.sendTyping();
                let roll = createRand(1, (parseInt(afterCom) + 1));
                if (afterCom > 2) {
                    title = `Results of roll from ${Math.floor(afterCom)} sided die:`;
                } else if (afterCom === "2") {
                    title = `Results of coin flip:`;
                } else {
                    throw 'Issue parsing afterCom as number';
                }
                rollEmbed = new Discord.MessageEmbed()
                    .setColor("#900C3F")
                    .setTitle(title)
                    .setThumbnail("https://cdn-icons-png.flaticon.com/512/522/522072.png")
                    .setDescription(roll)
                    .setFooter(`Requested by ${message.member.user.tag}`, msgavatarurl)
                    .setTimestamp();
                message.channel.send({ embeds: [rollEmbed] });
            } catch (error) {
                logger.error(error);
                message.channel.send("The roll command couldn't be completed. Please ensure you're inputting a number (greater than 1, and no decimals) for the number of sides the dice will have.");
            }
            break;
        case 'racc.stop':
            let stop = false;
            if (message.author.id === "295075692620546048") {
                message.channel.sendTyping();
                stop = true;
            }
            if (stop == true) {
                message.channel.send(`bye bye <@295075692620546048> 🦝`);
                setTimeout(() => shutdownRacc(message), 500);
            }
            break;
        default:
            break;
    }
});



client.login(process.env.BOT_TOKEN);