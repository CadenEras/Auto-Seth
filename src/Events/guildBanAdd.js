/** @format */

const Event = require('../Structures/event')
const config = require('../Config/config.json')

module.exports = new Event('guildBanAdd', async (client, ban) => {
    const dramaChannel = config.drama
    const channelDev = client.channels.cache.find(
        (channel) => channel.id === dramaChannel
    )

    //console.log(`[MEMBER EVENT]  Member Ban in ${member.guild.name} !`)

    const fetchedLogs = await ban.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD',
    })
    // Since there's only 1 audit log entry in this collection, grab the first one
    const banLog = fetchedLogs.entries.first()

    // Perform a coherence check to make sure that there's *something*
    if (!banLog)
        return console.log(
            `${ban.user.tag} was banned from ${ban.guild.name} but no audit log could be found.`
        )

    // Now grab the user object of the person who banned the member
    // Also grab the target of this action to double-check things
    const {executor, target, reason} = banLog

    // Update the output with a bit more information
    // Also run a check to make sure that the log returned was for the same banned member

    try {
        if (target.id === ban.user.id) {
            channelDev.send(
                `${ban.user.tag} got hit with the hammer of justice, wielded by the mighty ${executor.tag} for : ${reason}`
            )
        } else {
            channelDev.send(
                `${ban.user.tag} got hit with the hammer of justice, but audit log fetch was inconclusive.`
            )
        }
    } catch (error) {
        console.log(error)
    }
})
