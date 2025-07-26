/*
 * GitHub Webhook Listener
 * Listens for push events on a GitHub repository and sends a message to a Discord channel.
 * index.js is the main entry point of an application, this file´s name is a convention in Node.js applications.
 * normaly it is the first file that is executed when the application starts.
 * 
 * For this project is the entry point of the application.
 * that calls src/bot.js to start the Discord bot.
 */

// Import the bot module to start the Discord bot
import("./src/bot.js")

process.on('SIGINT', () => {
    console.log('👋 Shutting down bot...');
    // Stop the GitHub watcher if it's running
    import("./src/githubWatcher.js").then(({ stopGitHubWatcher }) => {
        stopGitHubWatcher();
        process.exit(0); // Exit the process gracefully
    });
});
