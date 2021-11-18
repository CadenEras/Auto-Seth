/** @format */

const Event = require("../Structures/event")
const config = require('../Config/config.json')

module.exports = new Event("guildBanAdd", (client, member) => {
    dramaChannel = config.drama;
    const channelDev = client.channels.cache.find(channel => channel.id === dramaChannel)

   console.log(`[MEMBER EVENT]  Member Ban in ${member.guild.name} !`)

   const banMsg = `<@${member.id}> have been ban. The hammer is the hammer.`

   channelDev.send(banMsg)
})