/*
* GitHub Watcher Bot
* A bot that watches a GitHub repository for changes and notifies users.
* This file contains the main logic for the bot.
* initialize the bot and manage events.
*/

import { Client, GatewayIntentBits } from 'discord.js';
import { startGitHubWatcher, stopGitHubWatcher } from './githubWatcher.js';
import { config, getSecrets } from './config.js';

/*
When you use export default and import, you name the import whatever you want.
For example, you can import the ping command like this:
*/
import pingCommand from './commands/ping.js';


/*
An alternative way to import the ping command is to use named exports.
This allows you to import multiple commands or functions from the same file.
For example, if you had multiple commands in a file, you could do:
import { pingCommand, anotherCommand } from './commands/ping.js';
*/

/*
* Create a new Discord client instance
* The client is the main interface to interact with the Discord API.
* It handles events, messages, and commands.
* The intents specify which events the bot should listen to.
* This is necessary for the bot to receive messages and other events.
* The GatewayIntentBits.Guilds intent allows the bot to receive events related to guilds (servers).
* The GatewayIntentBits.GuildMessages intent allows the bot to receive messages in guilds.
* The GatewayIntentBits.MessageContent intent allows the bot to read the content of messages.
*/
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const commands = new Map(); // Store commands in a Map for easy access

// Register the ping command
commands.set(pingCommand.name, pingCommand);

// client.once 'ready' event is triggered when the bot is ready to start working
// This is where you can set up event listeners and other initialization logic. 
client.once('ready', () => {
    console.log(`Successfully connected Bot as ${client.user.tag}!`);

    // Start the GitHub watcher when the bot is ready
    try {
        console.log('Starting GitHub watcher...');
        const channel = client.channels.cache.get(config.DISCORD_CHANNEL_ID);

        if (channel) {
            startGitHubWatcher(channel);
            console.log(`GitHub watcher started in channel: ${channel.name}`);
        } else {
            console.error(`Channel ${config.DISCORD_CHANNEL_ID} not found. Please check your configuration.`);
        }
    } catch (error) {
        console.error(`Error starting GitHub watcher: ${error.message}`);
    }
});

// client.on 'messageCreate' event is triggered when a new message is created in a guild
client.on('messageCreate', (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) {
        return; // Ignore messages that don't start with the prefix or are from bots
    }
    // Extract the command name and arguments from the message
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase(); // Get the command name from the message

    const command = commands.get(commandName); // Get the command from the Map
    if (command) {
        try {
            command.execute(message, args); // Execute the command with the message and arguments
        } catch (error) {
            console.error(`Error executing command "${commandName}":`, error);
        }
    }
});



// Log in to Discord with the bot's token from the config
client.login(getSecrets().DISCORD_TOKEN);