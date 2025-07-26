/*
* GitHub API 
* This module provides functions to interact with the GitHub API.
* It includes methods for fetching repository data, issues, and pull requests.
*/

import { config, getSecrets} from './config.js';

// Cache the GitHub token for efficiency
const secrets = getSecrets().GITHUB_TOKEN;

// Define the GitHub API base URL
const baseUrl = `https://api.github.com/repos/${config.GITHUB_REPO}`;

// Set headers for GitHub API requests, using the token if available
const headers = secrets ? 
    {Authorization: `token ${secrets}`} : {};

export async function getLatestCommit() {
    try {
        const response = await fetch(`${baseUrl}/commits`, { headers});

        if (!response.ok && response.status === 403) {
            console.warn('GitHub API rate limit hit, backing off...');
            return null;
        }

        const commits = await response.json();

        // Check if commits array is empty
        if (commits.length === 0) {
            console.warn('No commits found in the repository.');
            return null;
        } else {
            return commits[0]; // Return the latest commit
        }

    } catch (error) {
        console.error(`Error fetching commits: ${error.message}`);
        return null;
    }

}