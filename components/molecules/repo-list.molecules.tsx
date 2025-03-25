import { GitHubRepository } from "@/types";
import { Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  CodeBracketIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

// Props for the RepoList component
interface RepoListProps {
  data: GitHubRepository[]; // Array of GitHub repositories
  handleRepoClick: (repo: GitHubRepository) => void; // Function to handle repository click
  isReadmeLoading: boolean; // Flag indicating if the README is loading
  selectedRepo: GitHubRepository | null; // Currently selected repository
}

// Component to display a list of GitHub repositories
export function RepoList({
  data,
  handleRepoClick,
  isReadmeLoading,
  selectedRepo,
}: RepoListProps) {
  return (
    <ul className="css-repo-list">
      {data.map((repo) => (
        <Transition
          key={repo.id}
          appear
          show
          as="div"
          enter="css-transition-enter"
          enterFrom="css-transition-enter-from"
          enterTo="css-transition-enter-to"
          leave="css-transition-leave"
          leaveFrom="css-transition-leave-from"
          leaveTo="css-transition-leave-to"
        >
          <li
            key={repo.id}
            className="css-repo-item"
            onClick={() => handleRepoClick(repo)}
          >
            <div className="css-repo-content">
              {isReadmeLoading && selectedRepo?.id == repo.id && (
                <div className="css-loading-overlay">
                  <ArrowPathIcon className="css-loading-icon" />
                </div>
              )}
              <span className="css-repo-name">{repo.name}</span>
              <p className="css-repo-description">{repo.description}</p>
              <div className="css-repo-topics">
                {repo.topics.map((topic) => (
                  <span key={topic} className="css-repo-topic">
                    {topic}
                  </span>
                ))}
              </div>
              <div className="css-repo-stats">
                <div className="css-repo-stat">
                  <StarIcon className="css-repo-stat-star" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="css-repo-stat">
                  <ArrowPathIcon className="css-repo-stat-fork" />
                  <span>{repo.forks_count}</span>
                </div>
                <div className="css-repo-stat">
                  <CodeBracketIcon className="css-repo-stat-language" />
                  <span>{repo.language}</span>
                </div>
              </div>
            </div>
          </li>
        </Transition>
      ))}
    </ul>
  );
}
