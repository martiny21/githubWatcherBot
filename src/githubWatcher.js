/**
 * This module provides functions to interact with the GitHub API.
 * It has the logic to fetch the information about the latest commit in a repository.
 * To suddenly notify users about new commits on Discord.
 */

import { config } from './config.js';
import { getLatestCommit } from './github.js';

let lastSha = null; // Variable to store the last commit SHA
let watcherInterval = null; // Variable to store the interval ID

/**
 * Starts the GitHub watcher.
 * This function sets up an interval to check for new commits in the specified repository.
 * @param {Object} channel - The Discord channel to send notifications to.
 * @returns {void}
 */
export async function startGitHubWatcher(channel) {
    // Clear any existing interval to avoid multiple watchers
    if (watcherInterval) {
        clearInterval(watcherInterval);
    }

    watcherInterval = setInterval(async() => {
        try {
            const latestCommit = await getLatestCommit();

            if (latestCommit && latestCommit.sha !== lastSha) {
                const commitMessage = `📢 Nuevo commit en **${config.GITHUB_REPO}** \n` +
                    `Author: ${latestCommit.commit.author.name}\n` +
                    `Message: ${latestCommit.commit.message}\n` +
                    `URL: ${latestCommit.html_url}`;

                channel.send(commitMessage);
                lastSha = latestCommit.sha; // Update the last SHA to the current one
            }
        } catch (error) {
            console.error(`Error in GitHub watcher: ${error.message}`);
        }
    }, config.checkInterval);
}

/**
 * Stops the GitHub watcher.
 * This function clears the interval set for checking new commits.
 * param {void}
 * @returns {void}
 */
export function stopGitHubWatcher() {
    if (watcherInterval) {
        clearInterval(watcherInterval);
        watcherInterval = null;
        console.log('GitHub watcher stopped.');
    }
}
