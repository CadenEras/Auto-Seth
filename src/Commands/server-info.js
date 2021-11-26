/** @format */

const Command = require('../Structures/command')

const Discord = require('discord.js')

module.exports = new Command({
    name: 'server-info',
    description: 'Get information of the current server !',
    guildOnly: true,
    cooldown: 5,
    usage: 'as!server-info',
    permission: 'SEND_MESSAGES',
    async run(message, args, client) {
        try {
            const embed1 = new Discord.MessageEmbed()

                .setTitle(`Auto Seth's research module`)
                .setColor('#af4ae9')
                .addField("Guild's name :", `${message.guild.name}`)
                .addField("Guild's ID :", `${message.guild.id}`)
                .addField('Created on :', `${message.guild.createdAt}`)
                .addField('Member count :', `${message.guild.memberCount}`)
                .addField(
                    'Owner :',
                    `<@${message.guild.ownerId}> (${message.guild.ownerId})`
                )
                .addField('Partnered :', `${message.guild.partnered}`)
                .addField('Premium tier :', `${message.guild.premiumTier}`)
                .addField(
                    'Premium count :',
                    `${message.guild.premiumSubscriptionCount}`
                )
                .addField(
                    'Verification level :',
                    `${message.guild.verificationLevel}`
                )
                .addField('NSFW level :', `${message.guild.nsfwLevel}`)
                .addField(
                    'Explicit content filter level :',
                    `${message.guild.explicitContentFilter}`
                )
                .addField('Verified :', `${message.guild.verified}`)
                .addField(
                    'System channel :',
                    `${message.guild.systemChannel} (${message.guild.systemChannelId})`
                )
                .addField('Large :', `${message.guild.large}`)
                .addField('Available :', `${message.guild.available}`)
                .setThumbnail(`${message.guild.iconURL()}`)
                .setAuthor(
                    `${message.guild.name}`,
                    `${message.guild.iconURL()}`
                )
                .setTimestamp()
                .setFooter('Auto Seth')

            await message.channel.send({embeds: [embed1]})
        } catch (error) {
            console.log(error)
            message.channel.send(
                `Something went wrong... You should report that in my maintenance server with the following log. Stack error log : ${error}`
            )
        }
    },
})
