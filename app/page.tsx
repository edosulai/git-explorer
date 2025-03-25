"use client";

import { UserReposFormData, userReposSchema } from "@/schemas";
import { getRepoReadme, getUserRepos } from "@/services";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function Home() {
  const methods = useForm<UserReposFormData>({
    resolver: zodResolver(userReposSchema),
  });

  const { register, watch } = methods;
  const username = watch("username");

  const { data, error, isLoading } = useQuery<GitHubRepository[]>({
    queryKey: ["userRepos", username],
    queryFn: () => getUserRepos(username),
    enabled: !!username,
  });

  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(
    null
  );

  const { data: readmeContent, isLoading: isReadmeLoading } = useQuery({
    queryKey: ["repoReadme", selectedRepo?.name],
    queryFn: () => getRepoReadme(username, selectedRepo!.name),
    enabled: !!selectedRepo?.name,
  });

  const handleRepoClick = async (repo: GitHubRepository) => {
    setSelectedRepo(repo);
  };

  const closeModal = () => {
    setSelectedRepo(null);
    setIsRepoDetailsOpen(false);
  };

  const [isRepoDetailsOpen, setIsRepoDetailsOpen] = useState(false);

  const toggleRepoDetails = () => {
    setIsRepoDetailsOpen(!isRepoDetailsOpen);
  };

  return (
    <main className="css-main">
      <FormProvider {...methods}>
        <input
          {...register("username")}
          placeholder="Search by name"
          className="css-input"
        />
      </FormProvider>
      {isLoading && (
        <div className="css-loading">
          <ArrowPathIcon className="css-loading-icon" />
        </div>
      )}
      {error && <p className="css-error">{error.message}</p>}
      {data ? (
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
      ) : (
        <Transition
          appear
          show
          as="div"
          enter="css-transition-enter-long"
          enterFrom="css-transition-enter-from"
          enterTo="css-transition-enter-to"
          leave="css-transition-leave"
          leaveFrom="css-transition-leave-from"
          leaveTo="css-transition-leave-to"
        >
          <div className="css-placeholder-animation">Type Something ...</div>
          <div className="css-blob-animation" />
        </Transition>
      )}

      {selectedRepo && readmeContent && (
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
      )}
    </main>
  );
}
