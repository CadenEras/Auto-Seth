/** @format */

const chalk = require('chalk')
const Event = require('../Structures/event')

module.exports = new Event('guildCreate', (client, guild) => {
    console.log(chalk.cyan
        (`[GUILD INFO] ${guild.name} (${guild.id}) added Auto Seth. Owner : <@${guild.ownerId}>. Ready on it.`)
    )
})
