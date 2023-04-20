/** @format */

const { SlashCommandBuilder } = require('discord.js')
const config = require("../../config/config.json");
const Sentry = require("@sentry/node");
const fs = require("fs");
let logFileStream = fs.createWriteStream(config.logFileStreamPath, { flags: "a" });
let streamKonsole = new console.Console(logFileStream, logFileStream, false);
let time = Date.now();
const currentDate = new Date(time).toISOString();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get the bot response time !'),
    async execute(interaction) {
        try {
            await interaction.reply(`pong ! I'm alive ! `)
        } catch (error) {
            Sentry.captureException(error);
            streamKonsole.error(
                `${currentDate} => error occurred in ${interaction.guild.id} => \n\t\t\t => ${error}`
            );
        }
    },
}
