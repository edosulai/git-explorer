import { GitHubRepository } from "@/types";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  CalendarIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ExclamationCircleIcon,
  EyeIcon,
  IdentificationIcon,
  LinkIcon,
  StarIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

// Props for the RepoModal component
interface RepoModalProps {
  selectedRepo: GitHubRepository; // Selected repository details
  readmeContent: string; // README content of the repository
  closeModal: () => void; // Function to close the modal
  isRepoDetailsOpen: boolean; // Flag indicating if the repository details are open
  toggleRepoDetails: () => void; // Function to toggle repository details visibility
}

// Component to display the modal with repository details and README content
export function RepoModal({
  selectedRepo,
  readmeContent,
  closeModal,
  isRepoDetailsOpen,
  toggleRepoDetails,
}: RepoModalProps) {
  return (
    <Transition
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
      <Dialog
        open={selectedRepo !== null}
        onClose={closeModal}
        className="css-dialog"
      >
        <DialogBackdrop transition className="css-dialog-backdrop" />
        <div className="css-dialog-container">
          <div className="css-dialog-content">
            <DialogPanel transition className="css-dialog-panel">
              <div className="css-dialog-inner">
                <div className="css-dialog-header">
                  <div className="css-dialog-controls">
                    {isRepoDetailsOpen ? (
                      <ChevronDoubleUpIcon
                        className="css-dialog-toggle-up"
                        onClick={toggleRepoDetails}
                      />
                    ) : (
                      <ChevronDoubleDownIcon
                        className="css-dialog-toggle-down"
                        onClick={toggleRepoDetails}
                      />
                    )}
                    <XMarkIcon
                      className="css-dialog-close"
                      onClick={closeModal}
                    />
                  </div>
                  <Transition
                    show={isRepoDetailsOpen}
                    as="div"
                    enter="css-transition-enter"
                    enterFrom="css-transition-enter-from"
                    enterTo="css-transition-enter-to"
                    leave="css-transition-leave"
                    leaveFrom="css-transition-leave-from"
                    leaveTo="css-transition-leave-to"
                  >
                    <div className="css-repo-details">
                      <div className="css-repo-details-grid">
                        <div className="css-repo-details-grid-item">
                          <UserIcon className="icon-user" />
                          <span>Owner:</span>
                        </div>
                        <div className="css-repo-span">
                          <a
                            href={selectedRepo.owner.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="css-link"
                          >
                            {selectedRepo.owner.login}
                          </a>
                        </div>
                        <div className="css-repo-details-grid-item">
                          <StarIcon className="icon-star" />
                          <span>Stars:</span>
                        </div>
                        <div className="css-repo-span-auto">
                          <span>{selectedRepo.stargazers_count}</span>
                        </div>
                        <div className="css-repo-details-grid-item">
                          <IdentificationIcon className="icon-user" />
                          <span>Name:</span>
                        </div>
                        <div className="css-repo-span">
                          <span>{selectedRepo.name}</span>
                        </div>
                        <div className="css-repo-details-grid-item">
                          <ArrowPathIcon className="icon-fork" />
                          <span>Forks:</span>
                        </div>
                        <div className="css-repo-span-auto">
                          <span>{selectedRepo.forks_count}</span>
                        </div>
                        <div className="css-repo-details-grid-item">
                          <DocumentTextIcon className="icon-user" />
                          <span>Description:</span>
                        </div>
                        <div className="css-repo-span">
                          <span>{selectedRepo.description}</span>
                        </div>
                        <div className="css-repo-details-grid-item">
                          <ExclamationCircleIcon className="icon-issue" />
                          <span>Open Issues:</span>
                        </div>
                        <div className="css-repo-span-auto">
                          <span>{selectedRepo.open_issues_count}</span>
                        </div>
                        <div className="css-repo-details-grid-item">
                          <CodeBracketIcon className="icon-user" />
                          <span>Language:</span>
                        </div>
                        <div className="css-repo-span">
                          <span>{selectedRepo.language}</span>
                        </div>
                        <div className="css-repo-details-grid-item">
                          <EyeIcon className="icon icon-watch" />
                          <span>Watchers:</span>
                        </div>
                        <div className="css-repo-span-auto">
                          <span>{selectedRepo.watchers_count}</span>
                        </div>
                        <div className="css-repo-details-grid-item">
                          <LinkIcon className="icon-user" />
                          <span>Repository URL:</span>
                        </div>
                        <div className="css-repo-span">
                          <a
                            href={selectedRepo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="css-link"
                          >
                            {selectedRepo.html_url}
                          </a>
                        </div>
                        <div className="css-repo-details-grid-item">
                          <CalendarIcon className="icon-calendar" />
                          <span>Created At:</span>
                        </div>
                        <div className="css-repo-span-auto">
                          <span>
                            {new Date(
                              selectedRepo.created_at
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="css-repo-show-hidden" />
                        <div className="css-repo-span css-repo-show-hidden" />
                        <div className="css-repo-details-grid-item">
                          <CalendarIcon className="icon-calendar" />
                          <span>Updated At:</span>
                        </div>
                        <div className="css-repo-span-auto">
                          <span>
                            {new Date(
                              selectedRepo.updated_at
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
                <div className="markdown-body css-markdown">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {readmeContent}
                  </ReactMarkdown>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
