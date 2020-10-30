// you're gonna go to helios and you're GONNA LIKE IT, you hear?
require('log-timestamp')('#raccbot');
require('dotenv').config();
const osu = require('node-os-utils');
const cpu = osu.cpu;
const mem = osu.mem;
const netstat = osu.netstat;
const os = require('os');
const Discord = require('discord.js');
const client = new Discord.Client();
const raccArr = ['raccoon', 'raccbot', 'trash', 'trash panda', 'egg', 'eggs', 'ĕğğ', 'dnglchlk', 'erick', 'Erick', 'ĔĞĞ', 'procyon', 'procyon lotor', 'helios'];

client.on('ready', () => {
    client.user.setStatus('available')
    client.user.setPresence({
        activity: {
            name: "the dumpster behind arby's",
            type: "COMPETING",
        }
    });
    setInterval(aliveTimer, 900000);

    function aliveTimer() { console.log("raccbot is still alive, carry on."); }
});

client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'non-amet');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
});

client.on('guildMemberRemove', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'non-amet');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`${member} has left Chalkland`);
});

client.on("guildBanAdd", function (guild, user) {
    if (guild.id === '696540783385247824') {
        const channel = guild.channels.cache.find(ch => ch.name === 'non-amet');
        channel.startTyping();
        channel.send(`${user} was just **banned** from ${guild} :eyes:`);
        channel.stopTyping();
    }
});

client.once('ready', () => {
    console.log('raccbot is ready to steal your trash now 🦝');
});

client.on('message', async message => {
    const raccEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'raccmask');
    async function raccMessage() {
        for (let i = 0; i < raccArr.length; i++) {
            if (message.content.includes(raccArr[i]) === true && guild.id != '654872349090250753') {
                try {
                    await message.react(raccEmoji);
                    console.log(`did somebody say ${raccArr[i]}?`);
                } catch (error) {
                    console.error(`raccEmoji not in ${guild}`)
                }
            }
        }
    }
    if (message.author.bot) return;
    let { guild, channel } = message;
    let msgavatarurl = message.member.user.avatarURL;
    const usermsg = message.content.split(' ');
    raccMessage();

    switch (usermsg[0]) {
        case 'racc.ping':
            message.channel.startTyping();
            message.channel.send("Pong.");
            console.log(`Pinging ${channel}, ${guild}`);
            message.channel.stopTyping();
            break;
        case 'racc.pong':
            message.channel.startTyping();
            message.channel.send("Ping.");
            console.log(`Ponging ${channel}, ${guild}`);
            message.channel.stopTyping();
            break;
        case 'racc.repeat':
        case 'racc.repeat.twice':
            let str = usermsg.slice(1).join(' ');
            message.channel.startTyping();
            var msgSelect = Math.round(Math.random() * (3 - 0) + 1);
            if ((message.member.user.id).toString() != "575763130743914496") {
                str = str.replace(/erick is/i, `${message.member.user.tag} is`);
            }
            switch (msgSelect) {
                case 1:
                    str = str.replace(/i am/i, "You are");
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
                console.log(`Double repeat of ${message.member.user.tag} message ${usermsg.slice(1).join(' ')} from ${channel}, ${guild}`);
            }
            else { console.log(`Repeat of ${message.member.user.tag} message ${usermsg.slice(1).join(' ')} from ${channel}, ${guild}`); }
            message.channel.send(str);
            message.channel.stopTyping();
            break;
        case 'racc.helios':
            message.channel.startTyping();
            console.log("Sending Helios Server Data...");
            let processorCount = cpu.count();
            let memoryTotal = `${Math.round(mem.totalMem() / 1024 / 1024)} MB`;
            let systemUptime = `${Math.round(os.uptime() / 3600)} Hours`;
            const heliosinfEmbed = new Discord.MessageEmbed()
                .setColor('#900C3F')
                .setTitle('Helios Server Info')
                .setURL('https://chalkland.net/')
                .setAuthor('Helios, the Creator', 'https://chalkland.net/Pictures/helios.jpg', 'https://chalkland.net')
                .setDescription('various current helios system statistics')
                .addFields(
                    { name: 'Physical CPU Count:', value: `${processorCount} across 2 Chips`, inline: true },
                    { name: 'CPU Usage:', value: `${await cpu.usage()}%`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Total Memory:', value: memoryTotal, inline: true },
                    { name: 'Free Memory:', value: `${(await mem.free()).freeMemMb} MB`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Network Usage:', value: `${(((await netstat.inOut()).total.outputMb) + ((await netstat.inOut()).total.inputMb)) * 1024} KB/s`, inline: true },
                    { name: 'System Uptime:', value: systemUptime, inline: true },
                )
                .setFooter(`Requested by ${message.member.user.tag}`, msgavatarurl)
                .setTimestamp();
            //console.log(processorCount, processorUsage, memoryTotal, memoryFree, networkUsage, systemUptime)
            message.channel.send(heliosinfEmbed);
            message.channel.stopTyping();
            console.log(`Finished collecting helios system data, sent to ${channel}, ${guild}`);
            break;
        case 'racc.info':
        case 'racc.commands':
        case 'racc.cmds':
        case 'racc.help':
            message.channel.startTyping();
            message.channel.send("Find Help Here: https://chalkland.net/raccbot/help.html");
            console.log(`Help page sent to ${channel}, ${guild}`);
            message.channel.stopTyping();
            break;
        default:
            break;
    }
});


client.login(process.env.BOT_TOKEN);
