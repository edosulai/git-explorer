// Interface representing a GitHub profile
export interface GitHubProfile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

// Interface representing a GitHub user with additional details
export interface GitHubUser extends GitHubProfile {
  user_view_type: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

// Interface representing a GitHub repository
export interface GitHubRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GitHubProfile;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: string | null;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

// Interface representing the structure of a GitHub README file
export interface GitHubREADME {
  name: string; // Name of the file
  path: string; // Path to the file in the repository
  sha: string; // SHA hash of the file
  size: number; // Size of the file in bytes
  url: string; // API URL to access the file
  html_url: string; // URL to view the file in the browser
  git_url: string; // Git URL to access the file
  download_url: string; // URL to download the file
  type: string; // Type of the file (e.g., "file")
  content: string; // Base64 encoded content of the file
  encoding: string; // Encoding of the content (e.g., "base64")
  _links: {
    self: string; // URL to access this resource
    git: string; // Git URL to access this resource
    html: string; // HTML URL to view this resource
  };
}
