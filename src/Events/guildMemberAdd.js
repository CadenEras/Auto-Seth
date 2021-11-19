/** @format */

const Event = require("../Structures/event")
const config = require("../Config/config.json")

module.exports = new Event("guildMemberAdd", (client, member) => {
   const channelId = member.guild.systemChannelId
   const welcomeChannel = member.guild.channels.cache.get(channelId)
   const dramaChannel = config.drama
    const channelDev = client.channels.cache.find(
        (channel) => channel.id === dramaChannel
    )

   console.log(`[MEMBER EVENT] New member in ${member.guild.name} !`)

   const welcomeMessage = `Welcome <@${member.id}> on our cloud !~`

   channelDev.send(`New Member : ${member.user.tag}\nJoined on : ${member.joinedAt}`)
   welcomeChannel.send(welcomeMessage)
})
