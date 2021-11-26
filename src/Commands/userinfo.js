/** @format */

const Command = require('../Structures/command')

const Discord = require('discord.js')
const moment = require('moment')

module.exports = new Command({
    name: 'user-info',
    description:
        'Shows the author of the message or the mentioned user, their informations!',
    guildOnly: true,
    type: 'TEXT',
    cooldown: 5,
    usage: 'as!user-info or as!user-info [user mention]',
    permission: 'SEND_MESSAGES',
    async run(message, args, client) {
        const member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.member

        var acknowledgements = 'none'
        const admin = member.permissions.has(
            Discord.Permissions.FLAGS.ADMINISTRATOR,
            true
        )

        if (member.id === message.guild.ownerId) {
            acknowledgements = 'Server Owner'
        } else if (admin) {
            acknowledgements = 'Server Administrator'
        } else {
            acknowledgements = 'Simple Member'
        }

        const infoEmbed = new Discord.MessageEmbed()

            .setTitle("User's information :")
            .setColor('#af4ae9')
            .setDescription(
                `Username : ${member.user.username}\nID : ${member.user.id}\n`
            )
            .setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)
            .setAuthor(
                `${message.author.username}`,
                `${member.user.displayAvatarURL({dynamic: true})}`
            )
            .addField(
                'Joined this server on: ',
                `${moment(member.joinedAt).format('dddd, MMMM Do YYYY')}`,
                true
            )
            .addField(
                'Created at: ',
                `${moment(member.user.createdAt).format(
                    'dddd, MMMM Do YYYY, HH:mm:ss'
                )}`,
                true
            )
            .addField('Status: ', `${member.presence?.status}`, true)
            .addField('Bannable : ', `${member.bannable}`, true)
            .addField('Kickable : ', `${member.kickable}`, true)
            .addField('Manageable : ', `${member.manageable}`, true)
            .addField('Acknowledgements: ', `${acknowledgements}`, true)
            .addField('Official Discord User: ', `${member.user?.system}`, true)
            .addField(
                `Roles [${
                    member.roles.cache
                        .filter((r) => r.id !== message.guild.id)
                        .map((roles) => `\`${roles.name}\``).length
                }]`,
                `${
                    member.roles.cache
                        .filter((r) => r.id !== message.guild.id)
                        .map((roles) => `<@&${roles.id}>`)
                        .join(' **|** ') || 'No Roles'
                }`,
                true
            )
            .setTimestamp()
            .setFooter(`Auto Seth's info module`)
        try {
            await message.channel.send({embeds: [infoEmbed]})
        } catch (error) {
            console.log(chalk.bgRed(error))
        }
        
    },
})
