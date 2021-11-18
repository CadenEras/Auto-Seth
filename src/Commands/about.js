/** @format */

const Command = require('../Structures/command')

const Discord = require('discord.js')

module.exports = new Command({
    name: 'about',
    description: 'Get information about Auto-Seth',
    type: 'TEXT',
    guildOnly: true,
    cooldown: 5,
    usage: 'z!about',
    permission: 'SEND_MESSAGES',
    async run(message, args, client) {
        try {
            const embed1 = new Discord.MessageEmbed()
                .setTitle('Auto Seth')
                .setColor('#af4ae9')
                .setDescription(
                    "Hi ! I'm Auto Seth, the second bot of CadenEras and first autonomous assistant of hers. I'm here to help with the maintenance her bots!"
                )
                .setThumbnail('https://i.imgur.com/nGWE3Bc.png')
                .setAuthor('Auto Seth', 'https://i.imgur.com/QwmpLS8.png')
                .addField(`Language`, `JavaScript`, true)
                .addField(`Prefix`, `as!`, true)
                .addField(`Owner`, `CadenEras#2020 (795326819346808832)`, true)
                .addField(`Creation date`, `July 2021`, true)
                .addField(
                    `Maintenance Server :`,
                    `https://discord.gg/W6epQx8YHR`,
                    true
                )
                //.addField(`Repository (GitHub)`, `https://github.com/CadenEras/Caden_San_V3_Discord`, true)
                //.addField(`Invite`, `No invite link.`, true)
                .setTimestamp()
                .setFooter('Made By CadenEras#2020, with love <3')

            await message.channel.send({embeds: [embed1]})
        } catch (error) {
            console.log(error)
            message.channel.send(
                `Something went wrong... Stack error log : ${error}`
            )
        }
    },
})
