// you're gonna go to helios and you're GONNA LIKE IT, you hear?
const osu = require('node-os-utils');
const cpu = osu.cpu;
const mem = osu.mem;
const netstat = osu.netstat;
const os = require('os');
const Discord = require('discord.js');
const { cpuUsage } = require('process');
const client = new Discord.Client();

client.on('ready', () => {
    client.user.setStatus('available')
    client.user.setPresence({
        activity: {
            name: "the dumpster behind arby's",
            type: "COMPETING",
        }
    });
});

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.author.bot) return;
    let guildName = Discord.Guild.name;
    const usermsg = message.content.split(' ');

    switch (usermsg[0]) {
        case 'racc.ping':
            message.channel.send("Pong.");
            break;
        case 'racc.pong':
            message.channel.send("Ping.");
            break;
        case 'racc.repeat':
            // Rejoins every slice at spaces after the first slice
            let str = usermsg.slice(1).join(' ');
            var msgSelect = Math.round(Math.random() * (3 - 0) + 1);
            console.log(`Repeat of message ${usermsg.slice(1).join(' ')} from ${guildName}`);
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
            let processorCount = cpu.count();
            let processorUsage = "N/A";
            let memoryTotal = `${Math.round((mem.totalMem() / 1024 / 1024) * 1.049)} MiB`;
            let memoryFree = `${Math.round(os.freemem() / 1048576)} MiB`;
            let networkUsage = 0;
            let systemUptime = `${Math.round(os.uptime() / 3600)} Hours`;
            cpu.usage()
                .then(info => {
                    processorUsage = `${info}%`;
                    console.log(info);
                })
            netstat.inOut()
                .then(info => {
                    networkUsage = `${info}`
                    console.log(info)
                })
            processorUsage = cpu.usage().then;
            // add embed with os.cpu/mem info
            const heliosinfEmbed = new Discord.MessageEmbed()
                .setColor('#900C3F')
                .setTitle('Helios Server Info')
                .setURL('https://chalkland.net/')
                .setAuthor('Helios, the Creator', 'https://i.pinimg.com/originals/8f/d7/9f/8fd79f40c98408cc41eaf338401089c7.jpg', 'https://chalkland.net')
                .setDescription('various current helios system statistics')
                //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
                .addFields(
                    { name: 'Physical CPU Count:', value: processorCount, inline: true },
                    { name: 'CPU Usage:', value: processorUsage, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Total Memory:', value: memoryTotal, inline: true },
                    { name: 'Free Memory:', value: memoryFree, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Network Usage:', value: networkUsage, inline: true },
                    { name: 'System Uptime:', value: systemUptime, inline: true },
                )
                .setTimestamp();
            console.log(processorCount, processorUsage, memoryTotal, memoryFree, networkUsage, systemUptime)
            message.channel.send(heliosinfEmbed);
            break;
        default:
            break;
    }
});


client.login('NjU0ODY1NjYxNjkxOTUzMTYz.XfLxLA.x-grbpZAzaXdO1tHwLMzXX5zeKI');
