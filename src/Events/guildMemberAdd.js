/** @format */

const Discord = require('discord.js')

const Event = require('../Structures/event')
const config = require('../Config/config.json')
const chalk = require('chalk')

module.exports = new Event('guildMemberAdd', (client, member) => {
    const rules = config.rules
    const channelId = config.welcome
    const welcomeChannel = client.channels.cache.find(
        (channel) => channel.id === channelId
    )
    const dramaChannel = config.drama
    const channelDev = client.channels.cache.find(
        (channel) => channel.id === dramaChannel
    )

    console.log(
        chalk.cyan(`[MEMBER EVENT] New member in ${member.guild.name} !`)
    )

    const welcomeMessage = new Discord.MessageEmbed()
        .setTitle(`WELCOME  !!! <@${member.id}>`)
        .setColor('#af4ae9')
        .setDescription(`Make sure to read the rules => <#${rules}>  !!\n`)
        .setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)
        .setTimestamp()
        .setFooter(`Auto Seth's Welcome module`)

    channelDev.send(
        `New Member : ${member.user.tag}\nJoined on : ${member.joinedAt}`
    )
    welcomeChannel.send({embed: [welcomeMessage]})
})
