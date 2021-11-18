/** @format */

const Command = require('../Structures/command')

const Discord = require('discord.js')
const moment = require('moment')

module.exports = new Command({
  name: 'roleinfo',
  description: 'Get information about role',
  type: 'TEXT',
  guildOnly: true,
  cooldown: 5,
  usage: 'z!roleinfo',
  permission: 'SEND_MESSAGES',
  async run(message, args, client) {
    try {
        let roleSearched = args.slice(1).join(' ')
        let role = message.mentions.roles.first() || message.guild.roles.cache.find((role) => role.id === roleSearched)

        const embed1 = new Discord.MessageEmbed()
            .setTitle(`"${role?.name}" information :`)
            .setColor('#af4ae9')
            .setThumbnail('https://i.imgur.com/QwmpLS8.png')
            .setAuthor('Auto Seth\'s research module', 'https://i.imgur.com/nGWE3Bc.png')
            .addField(`Id :`, `${role.id}`, true)
            .addField(`Client :`, `${role.client}`, true)
            .addField(`Created At :`, `${role.createdAt}`, true)
            .addField(`Deleted :`, `${role.deleted}`, true)
            .addField(`Hoist :`, `${role.hoist}`, true)
            .addField(`Permissions :`, `${role.permissions}`, true)
            .addField(`Position :`, `${role.position}`, true)
            .addField(`Raw Position :`, `${role.rawPosition}`, true)
            .addField(`Color :`, `${role.color}`, true)
            .addField(`Editable :`, `${role.editable}`, true)
            .setTimestamp()
            .setFooter('Auto Seth')

        await message.channel.send({ embeds: [embed1] })
    } catch (error) {
      console.log(error)
      message.channel.send(
        `Something went wrong... Stack error log : ${error}`
      )
    }
  },
})