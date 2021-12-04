/** @format */

const Event = require('../Structures/event')
const config = require('../Config/config.json')
const chalk = require('chalk')

module.exports = new Event('guildBanRemove', async (client, ban) => {
    const dramaChannel = config.drama
    const channelDev = client.channels.cache.find(
        (channel) => channel.id === dramaChannel
    )

    console.log(
        chalk.cyan(`[MEMBER EVENT]  Member Ban in ${member.guild.name} !`)
    )

    const fetchedLogs = await ban.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_REMOVE',
    })
    // Since there's only 1 audit log entry in this collection, grab the first one
    const unbanLog = fetchedLogs.entries.first()

    // Perform a coherence check to make sure that there's *something*
    if (!unbanLog)
        return console.log(
            `${ban.user.tag} was unbanned from ${ban.guild.name} but no audit log could be found.`
        )

    // Now grab the user object of the person who unbanned the member
    // Also grab the target of this action to double-check things
    const {executor, target} = unbanLog

    // Update the output with a bit more information
    // Also run a check to make sure that the log returned was for the same unbanned member

    try {
        if (target.id === ban.user.id) {
            channelDev.send(
                `${ban.user.tag} have been forgiven by the mighty ${executor.tag}`
            )
        } else {
            channelDev.send(
                `${ban.user.tag} have been forgiven, but audit log fetch was inconclusive.`
            )
        }
    } catch (error) {
        console.log(error)
    }
})
