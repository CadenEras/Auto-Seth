/**@format */

const chalk = require('chalk')
const Event = require('../Structures/event')

module.exports = new Event('ready', (client) => {
    console.log(
        chalk.green(
            `[CLIENT INFO] Time : ${client.readyAt}. Auto Seth is up, logged in as ${client.user.tag} (${client.user.id}), ready on ${client.guilds.cache.size} servers.`
        )
    )

    client.user.setPresence({
        activities: [
            {
                name: 'with CadenEras | as!',
                type: 'PLAYING',
            },
        ],
        status: 'online',
    })
})
