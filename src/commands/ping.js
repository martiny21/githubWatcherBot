/*
* Ping Command
* This module handles the ping command for the bot.
* It responds with a "pong" message to indicate that the bot is alive.
*/

export default {
    name: 'ping',   // Command name
    description: 'Responds with Pong!',   // Command description
    execute(message) {
        // Send a message back to the channel
        message.channel.send('Pong!');
    }
};