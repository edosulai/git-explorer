import {
  GitHubREADME,
  GitHubRepository,
  GitHubUser,
} from "@/types/github-user.types";
import restClient from "./config.services";

/**
 * Get GitHub user information
 * Endpoint: GET /users/{username}
 * @param {string} username - GitHub username
 * @returns {Promise<GitHubUser>} - User information
 * @throws {Error} - If the request fails
 * @example
 * getUserInfo('octocat').then(user => console.log(user));
 */
export async function getUserInfo(username: string) {
  const response = await restClient.get<GitHubUser>(`/users/${username}`);
  return response.data;
}

/**
 * Get public repositories of a GitHub user
 * Endpoint: GET /users/{username}/repos
 * @param {string} username - GitHub username
 * @returns {Promise<GitHubRepository[]>} - List of public repositories
 * @throws {Error} - If the request fails
 * @example
 * getUserRepos('octocat').then(repos => console.log(repos));
 */
export async function getUserRepos(username: string) {
  const response = await restClient.get<GitHubRepository[]>(
    `/users/${username}/repos`
  );
  return response.data;
}

/**
 * Get README content of a repository
 * Endpoint: GET /repos/{username}/{repo}/readme
 * @param {string} username - GitHub username
 * @param {string} repo - Repository name
 * @returns {Promise<GitHubREADME["content"]>} - README content
 * @throws {Error} - If the request fails
 * @example
 * getRepoReadme('octocat', 'Hello-World').then(readme => console.log(readme));
 */
export async function getRepoReadme(username: string, repo: string) {
  const response = await restClient.get<GitHubREADME["content"]>(
    `/repos/${username}/${repo}/readme`,
    {
      headers: { Accept: "application/vnd.github.v3.raw" },
    }
  );
  return response.data;
}
