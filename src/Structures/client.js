/**@format */

const Discord = require('discord.js')
const Command = require('./command.js')
const Event = require('./event.js')
const config = require('../Config/config.json')
const intents = new Discord.Intents(32767)
const fs = require('fs')

class Client extends Discord.Client {
    constructor() {
        super({
            intents,
            partials: [
                'MESSAGE',
                'CHANNEL',
                'GUILD_MEMBER',
                'REACTION',
                'USER',
            ],
        })

        /**
         * @type {Discord.Collection<string, Command>}
         */
        this.commands = new Discord.Collection()

        this.prefix = config.prefix
    }

    start(token) {
        // Command Handler
        const commandFiles = fs
            .readdirSync('./Commands')
            .filter((file) => file.endsWith('.js'))

        /**
         * @type {Command[]}
         */
        const commands = commandFiles.map((file) =>
            require(`../Commands/${file}`)
        )

        commands.forEach((command) => {
            console.log(
                `Loading Auto Seth\'s fonctions... Charging : "${command.name}"...`
            )
            this.commands.set(command.name, command)
        })

        const slashCommands = commands
            .filter((command) => ['BOTH', 'SLASH'].includes(command.type))
            .map((command) => ({
                name: command.name.toLowerCase(),
                description: command.description,
                permissions: [],
                options: command.slashCommandOptions,
                defaultPermission: true,
            }))

        this.removeAllListeners()

        this.on('ready', async () => {
            const cmds = await this.application.commands.set(slashCommands)

            cmds.forEach((cmd) =>
                console.log(`Slash Command ${cmd.name} registered`)
            )
        })

        fs.readdirSync('./Events')
            .filter((file) => file.endsWith('.js'))
            .forEach((file) => {
                /**
                 * @type {Event}
                 */
                const event = require(`../Events/${file}`)
                console.log(
                    `Loading Auto Seth\'s event... Charging : "${event.event}"...`
                )
                this.on(event.event, event.runFunction.bind(null, this))
            })

        //Will generate an API Error after reaching the 1000th login (v13)
        this.login(token)
    }
}

module.exports = Client
