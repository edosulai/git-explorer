"use client";

import { Input, Loading, RepoList, RepoModal } from "@/components";
import { useRepoReadme, useUserRepos } from "@/hooks";
import { UserReposFormData, userReposSchema } from "@/schemas";
import { GitHubRepository } from "@/types";
import { Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

// Home component for the main page
export default function Home() {
  // Form methods using react-hook-form
  const methods = useForm<UserReposFormData>({
    resolver: zodResolver(userReposSchema),
  });

  const { register, watch } = methods;
  const username = watch("username");

  // Use custom hook to fetch user repositories
  const { data, error, isLoading } = useUserRepos(username);

  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(
    null
  );

  // Use custom hook to fetch README content of the selected repository
  const { data: readmeContent, isLoading: isReadmeLoading } = useRepoReadme(
    username,
    selectedRepo?.name
  );

  // Handle repository click event
  const handleRepoClick = async (repo: GitHubRepository) => {
    setSelectedRepo(repo);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedRepo(null);
    setIsRepoDetailsOpen(false);
  };

  // Toggle repository details visibility
  const [isRepoDetailsOpen, setIsRepoDetailsOpen] = useState(false);
  const toggleRepoDetails = () => {
    setIsRepoDetailsOpen(!isRepoDetailsOpen);
  };

  return (
    <main className="css-main">
      <FormProvider {...methods}>
        <Input {...register("username")} placeholder="Search by name" />
      </FormProvider>
      {isLoading && <Loading />}
      {error && <p className="css-error">{error.message}</p>}
      {data ? (
        <RepoList
          data={data}
          handleRepoClick={handleRepoClick}
          isReadmeLoading={isReadmeLoading}
          selectedRepo={selectedRepo}
        />
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
        <RepoModal
          selectedRepo={selectedRepo}
          readmeContent={readmeContent}
          closeModal={closeModal}
          isRepoDetailsOpen={isRepoDetailsOpen}
          toggleRepoDetails={toggleRepoDetails}
        />
      )}
    </main>
  );
}
