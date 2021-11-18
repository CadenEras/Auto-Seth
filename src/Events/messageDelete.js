/** @format */

const Event = require("../Structures/event")
const config = require('../Config/config.json')

module.exports = new Event("messageDelete", (client, member, message) => {
    dramaChannel = config.drama;
    const channelDev = client.channels.cache.find(channel => channel.id === dramaChannel)

   console.log(`[MEMBER EVENT]  User deleted a message in ${member.user.guild.name} !`)

   const unbanMsg = `<@${member.user.id}> have been unban. The hammer is gone.`

   channelDev.send(unbanMsg)
})