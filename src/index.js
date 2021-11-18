/**@format */

/*
 *
 * Auto Seth, autonomous assistant for CadenEras's other bot.
 * Created on july 2021
 * by CadenEras#2020(795326819346808832)(Melissa Gries)
 *
 */

//require the discord.js module, the "client" is the bot itsefl.
const Client = require('./Structures/client')
const config = require('./Config/config.json')
const client = new Client()

client.start(config.token)
