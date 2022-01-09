/** @format */

const chalk = require('chalk')
const Command = require('../Structures/command')
const config = require('../Config/config.json')

module.exports = new Command({
    name: 'clear',
    description: 'Delete an amout of messages, amount between 1 and 100',
    type: 'BOTH',
    permission: 'MANAGE_MESSAGES',
    usage: 'as!clear [amount]',
    async run(message, args, client) {
        const dramaChannel = config.drama
        const channelDev = client.channels.cache.find(
            (channel) => channel.id === dramaChannel
        )
        const deleteCount = args[1]

        if (!deleteCount || isNaN(deleteCount)) {
            return message.reply(
                'Please provide a valid number between 1 and 100 !'
            )
        }

        const countParsed = parseInt(deleteCount)

        if (countParsed > 100) {
            return message.reply(
                'Hey ! I cannot delete more than 100 messages at the same time !'
            )
        }

        if (countParsed < 1) {
            return message.reply(
                'Hey ! Are you trying to create a black hole ? Retry with a valide number between 1 and 100 !'
            )
        }

        try {
            await message.channel.bulkDelete(countParsed)
            const replyDelete = await channelDev.send(
                `I cleared ${countParsed} messages in #${message.channel.name}.`
            )

            setTimeout(() => replyDelete.delete(), 4000)
        } catch (error) {
            console.log(
                chalk.bgRed(
                    'Something want wrong with the bulk deletion : ',
                    error
                )
            )
        }
    },
})
