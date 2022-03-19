/**@format */

/*
 *
 * Auto Seth, bot that can give information in server.
 * Created on july 2021
 * by CadenEras#2020(795326819346808832)(Melissa Gries)
 *
 */

//require the discord.js module, the "client" is the bot itsefl.
const Client = require('./Structures/client')
const config = require('./Config/config.json')

const Sentry = require("@sentry/node")
const Tracing = require("@sentry/tracing")
const chalk = require('chalk')

Sentry.init({
    dsn: config.dsnSentry,
    tracesSampleRate: 1.0,
})

const transaction = Sentry.startTransaction({
    op: "test",
    name: "First Transaction",
})

setTimeout(() => {
    try {
        foo()
        console.log(chalk.red.inverse("Error while trying to connect to Sentry !!!"))
    } catch (e) {
        Sentry.captureException(e)
    } finally {
        transaction.finish()
        console.log(chalk.green("Connection to Sentry succesfully established !"))
    }
})

const client = new Client()

client.start(config.token)
