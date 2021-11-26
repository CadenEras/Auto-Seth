/** @format */

const Event = require('../Structures/event')
const config = require('../Config/config.json')

module.exports = new Event('messageDelete', async (client, message) => {
    const dramaChannel = config.drama
    const channelDev = client.channels.cache.find(
        (channel) => channel.id === dramaChannel
    )

    console.log(`[MEMBER EVENT]  User deleted a message  !`)

    // Ignore direct messages
    if (!message.guild) return
    const fetchedLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: 'MESSAGE_DELETE',
    })
    // Since there's only 1 audit log entry in this collection, grab the first one
    const deletionLog = fetchedLogs.entries.first()

    // Perform a coherence check to make sure that there's *something*
    if (!deletionLog)
        return console.log(
            `A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`
        )

    // Now grab the user object of the person who deleted the message
    // Also grab the target of this action to double-check things
    const {executor, target, reason} = deletionLog

    // Update the output with a bit more information
    // Also run a check to make sure that the log returned was for the same author's message
    try {
        if (target.id === message.author.id) {
            channelDev.send(
                `A message by ${message.author.tag} was deleted by ${executor.tag}. Reason ${reason}`
            )
        } else {
            channelDev.send(
                `A message by ${message.author.tag} was deleted, but we don't know by who.`
            )
        }
    } catch (error) {
        console.log(chalk.bgRed(error))
    }
})
