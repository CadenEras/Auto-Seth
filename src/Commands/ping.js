/** @format */

const Command = require("../Structures/command")

const Discord = require("discord.js")
const chalk = require("chalk")

module.exports = new Command({
   name: "ping",
   description: "Get the bot response time !",
   type: "TEXT",
   guildOnly: true,
   usage: "as!ping",
   permission: "SEND_MESSAGES",
   async run(message, args, client) {
       try {
        await message.channel.send(
            `pong ! I'm alive ! ${Math.round(client.ws.ping)} ms, ${Date.now() - message.createdTimestamp} ms.`
        )
       } catch (error) {
           console.log(chalk.bgRed(error))
       }
   },
})