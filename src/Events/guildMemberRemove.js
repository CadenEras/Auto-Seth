/** @format */

const Event = require('../Structures/event')
const config = require('../Config/config.json')
const chalk = require('chalk')

module.exports = new Event('guildMemberRemove', async (client, member) => {
    const dramaChannel = config.drama
    const channelDev = client.channels.cache.find(
        (channel) => channel.id === dramaChannel
    )

    console.log(
        chalk.cyan(`[MEMBER EVENT]  User left in ${member.user.guild.name} !`)
    )

    const fetchedLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_KICK',
    })
    // Since there's only 1 audit log entry in this collection, grab the first one
    const kickLog = fetchedLogs.entries.first()

    // Perform a coherence check to make sure that there's *something*
    if (!kickLog)
        return channelDev.send(
            `${member.user.tag} left the guild by their own will.`
        )

    // Now grab the user object of the person who kicked the member
    // Also grab the target of this action to double-check things
    const {executor, target, reason} = kickLog

    // Update the output with a bit more information
    // Also run a check to make sure that the log returned was for the same kicked member
    try {
        if (target.id === member.id) {
            channelDev.send(
                `${member.user.tag} left the guild; kicked by ${executor.tag}. Reason : ${reason}`
            )
        } else {
            channelDev.send(
                `${member.user.tag} left the guild or was kicked, audit log fetch was inconclusive.`
            )
        }
    } catch (error) {
        console.log(chalk.bgRed(error))
        // expected output: Error
    }
})
