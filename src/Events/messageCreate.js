/**@format */

const Event = require('../Structures/event')
//const talkedRecently = new Set()

module.exports = new Event('messageCreate', (client, message) => {
    //if (message.author.bot) return

    if (!message.content.startsWith(client.prefix)) return

    //We just want to log message with the prefix
    console.log(
        `${message.createdAt} == > ${message.author} sent in #${message.channel.name} from ${message.guild.name} a message. Message content : "${message.content}"`
    )

    const args = message.content.slice(client.prefix.length).trim().split(/ +/)
    //const command = args.shift().toLowerCase();

    const command = client.commands.find((cmd) => cmd.name == args[0])

    if (!command) return

    const permission = message.member.permissions.has(command.permission, true)
    if (!permission) {
        return message.reply(
            '!!! Permission override detected !!! You are not CadenEras or a valid Administrator !!!'
        )
    }

    //try command here
    try {
        command.run(message, args, client)
    } catch (error) {
        //handle error
        console.log(chalk.bgRed(error))
        return message.reply(
            `Something went wrong.... Stack error log : ${error}`
        )
    }
})
