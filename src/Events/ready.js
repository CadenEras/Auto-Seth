/**@format */

const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(
            `\n[CLIENT INFO] Time : ${client.readyAt}. Auto Seth is up, logged in as ${client.user.tag} (${client.user.id}), ready on ${client.guilds.cache.size} servers.\n\n`
        );

        client.user.setPresence({
            activities: [
                {
                    name: 'with CadenEras | as!',
                    type: 'PLAYING',
                },
            ],
            status: 'online',
        });
    },
};
