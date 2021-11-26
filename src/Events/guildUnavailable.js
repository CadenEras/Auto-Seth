/** @format */

const chalk = require('chalk')
const Event = require('../Structures/event')

module.exports = new Event('guildUnvailable', (client, guild) => {
    console.log(chalk.yellow
        (`!!!====[GUILD WARN] ${guild.name} (${guild.id}) entered unavailable state !!!. Possible server outtage !!! Owner : <@${guild.ownerId}>.`)
    )
})
