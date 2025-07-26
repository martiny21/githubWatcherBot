/*
* Configuration
* This module contains configuration settings for the GitHub Watcher Bot.
* It includes API keys, repository information, and other settings.
*/

import dotenv from 'dotenv';
dotenv.config();

// Validate that the required environment variables are set
if (!process.env.DISCORD_TOKEN) {
    throw new Error('DISCORD_TOKEN is required but not found in environment variables');
}

if (!process.env.DISCORD_CHANNEL_ID) {
    throw new Error('DISCORD_CHANNEL_ID is required but not found in environment variables');
}

if (!process.env.GITHUB_REPO) {
    throw new Error('GITHUB_REPO is required but not found in environment variables');
}

if (!process.env.GITHUB_TOKEN) {
    console.warn('Warning: GITHUB_TOKEN is missing. Some GitHub API features may not work properly.');
}

// export makes the config object available to other modules
// This allows you to import it in other files like bot.js or main.js
export const config = {
    // Tokens is not recommended to be exported directly for security reasons
    DISCORD_CHANNEL_ID: process.env.DISCORD_CHANNEL_ID,
    GITHUB_REPO: process.env.GITHUB_REPO || 'martiny21/githubWatcherBot', // Default to a specific repo if not set
    prefix: '!',    // Command prefix for the bot
    checkInterval: 300000, // Interval to check for new commits in milliseconds (5 minutes)
};

// Make a function to get the Tokens is more secure than exporting them directly
export const getSecrets = () => ({
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
});