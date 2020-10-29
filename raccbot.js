// you're gonna go to helios and you're GONNA LIKE IT, you hear?
require('log-timestamp')('#raccbot');
require('dotenv').config();
const osu = require('node-os-utils');
const cpu = osu.cpu;
const mem = osu.mem;
const netstat = osu.netstat;
const os = require('os');
const Discord = require('discord.js');
const { cpuUsage } = require('process');
const { info } = require('console');
const client = new Discord.Client();

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

client.once('ready', () => {
    console.log('raccbot is ready to steal your trash now 🦝');
});

client.on('message', async message => {
    if (message.author.bot) return;
    let { guild } = message;
    let { channel } = message;
    const usermsg = message.content.split(' ');

    switch (usermsg[0]) {
        case 'racc.ping':
            message.channel.send("Pong.");
            console.log(`Pinging ${channel}, ${guild}`);
            break;
        case 'racc.pong':
            message.channel.send("Ping.");
            console.log(`Ponging ${channel}, ${guild}`);
            break;
        case 'racc.repeat':
            // Rejoins every slice at spaces after the first slice
            let str = usermsg.slice(1).join(' ');
            var msgSelect = Math.round(Math.random() * (3 - 0) + 1);
            console.log(`Repeat of message ${usermsg.slice(1).join(' ')} from ${channel}, ${guild}`);
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
            message.channel.send(str);
            break;
        case 'racc.helios':
            console.log("Sending Helios Server Data...");
            let processorCount = cpu.count();
            let memoryTotal = `${Math.round(mem.totalMem() / 1024 / 1024)} MB`;
            let systemUptime = `${Math.round(os.uptime() / 3600)} Hours`;
            cpu.usage().then(info => {/*console.log(info);*/ })
            netstat.inOut().then(info => {/*console.log(info.eno2.outputMb, info.eno2.inputMb)*/ })
            mem.free().then(info => { })
            const heliosinfEmbed = new Discord.MessageEmbed()
                .setColor('#900C3F')
                .setTitle('Helios Server Info')
                .setURL('https://chalkland.net/')
                .setAuthor('Helios, the Creator', 'https://chalkland.net/Pictures/helios.jpg', 'https://chalkland.net')
                .setDescription('various current helios system statistics')
                .addFields(
                    { name: 'Physical CPU Count:', value: `${processorCount} across 2 Cores`, inline: true },
                    { name: 'CPU Usage:', value: `${await cpu.usage()}%`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Total Memory:', value: memoryTotal, inline: true },
                    { name: 'Free Memory:', value: `${(await mem.free()).freeMemMb} MB`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Network Usage:', value: `${(((await netstat.inOut()).total.outputMb) + ((await netstat.inOut()).total.inputMb)) * 1024} KB/s`, inline: true },
                    { name: 'System Uptime:', value: systemUptime, inline: true },
                )
                .setTimestamp();
            //console.log(processorCount, processorUsage, memoryTotal, memoryFree, networkUsage, systemUptime)
            message.channel.send(heliosinfEmbed);
            console.log(`Finished collecting helios system data, sent to ${channel}, ${guild}`)
            break;
        default:
            break;
    }
});


client.login(process.env.BOT_TOKEN);
