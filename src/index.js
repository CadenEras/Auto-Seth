/**@format */

/*
 *
 * Auto Seth, multi-purpose bot.
 * Firstly created on July 2021, upgraded to V2 on April 2023
 * by CadenEras#2020(795326819346808832)(Melissa Gries)
 *
 */

//This is the start, nothing above, everything below !

const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
const config = require('./config/config.json')
const fs = require("fs");
const path = require("path");

//Using Sentry here => sentry.io
const Sentry = require("@sentry/node")

//Redirecting the output in a file. The two lines of code below are wherever needed in the whole code
let logFileStream = fs.createWriteStream(config.logFileStreamPath, { flags: "a" });
let streamKonsole = new console.Console(logFileStream, logFileStream, false);
//Setting the time for log...
let time = Date.now();
//...in a readable format
const currentDate = new Date(time).toISOString();

Sentry.init({
    dsn: config.dsnSentry,
    tracesSampleRate: 1.0,
})

//Setting Sentry transaction
const transaction = Sentry.startTransaction({
    op: "Auto-Seth Transactions",
    name: "Transaction for Auto-Seth's monitoring.",
})

//Configuring scope
Sentry.configureScope( ( scope ) => {
	scope.setSpan( transaction );
} );

//Creating the client
const client = new Client({ intents: [GatewayIntentBits.Guilds]})

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

try {
    client.login(config.token)
} catch (e) {
    //Handling errors
	streamKonsole.log( `${currentDate} => Error while initializing connection : ${e}` );
	Sentry.captureException( e );
} finally {
    transaction.finish();
	streamKonsole.log( "Connection to Sentry successfully established !" );
}

//Prevent from crashing on uncaught Exception from the try catch
process.on( "uncaughtException", function( err ) {
	Sentry.captureException(err);
	console.log( err && err.stack ? err.stack : err );
	streamKonsole.log( `${currentDate} => Uncaught exception occurred:\n`, err && err.stack ? err.stack : err );
} );

process.on( "unhandledRejection", function( err ) {
    Sentry.captureException(err);
    console.log( err && err.stack ? err.stack : err );
    streamKonsole.log( `${currentDate} => Unhandled Rejection occurred:\n`, err && err.stack ? err.stack : err );
} );
