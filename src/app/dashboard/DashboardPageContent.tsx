"use client";
import SetDefaultNavbar from "@/components/custom/SetDefaultNavbar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useDeleteStory,
  useGetStories,
  useGetUserStories,
} from "@/queries/story";
import type { User } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Pen, Rabbit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import toast from "react-hot-toast";

const getStory = (content: string, genre: string) => {
  return (
    <div>
      <Badge className="block absolute -top-2 -right-3">{genre}</Badge>
      {content.length <= 300 ? content : content.slice(0, 300) + " ..."}
    </div>
  );
};

const DashboardPageContent = ({ user }: { user: User }) => {
  const { data: rawStoryIds, isLoading: isLoadingStoriesIds } =
    useGetUserStories({
      userId: user.id,
    });

  const storyIds = useMemo(
    () => rawStoryIds?.map(({ id }) => id),
    [rawStoryIds],
  );

  const storiesQueries = useGetStories({ ids: storyIds ?? [] });
  const stories = storiesQueries.map((story) => story.data);
  const isLoadingStories = storiesQueries.some((story) => story.isLoading);

  const queryClient = useQueryClient();

  const { mutate: deleteStory, isPending: isDeleting } = useDeleteStory({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getStoryIds", user.id] });
    },
    onError: () => {
      toast.error("Unable to delete the story");
    },
  });

  const isLoading = isLoadingStoriesIds || isLoadingStories;

  return (
    <div>
      <SetDefaultNavbar />
      <div className="pt-36 px-20">
        {stories.length !== 0 && (
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Your stories</h2>
            <Link
              href="/new"
              className={cn(
                buttonVariants({
                  variant: "default",
                }),
              )}
            >
              <Pen className="size-4 mr-1.5" />
              Create new
            </Link>
          </div>
        )}
        {isLoading ? (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <Loader2 className="size-8 animate-spin" />
            <p className="text-muted-foreground mt-1.5">
              Fetching your stories...
            </p>
          </div>
        ) : stories.length === 0 ? (
          <div className="mt-10 w-full flex flex-col items-center justify-center gap-5">
            <Rabbit className="size-60 stroke-1 stroke-slate-800" />
            <p className="text-muted-foreground text-xl">
              No stories added yet!
            </p>
            <Link
              href="/new"
              className={cn(
                buttonVariants({
                  variant: "default",
                  className: "cursor-pointer-custom",
                }),
              )}
            >
              <Pen className="size-4 mr-1.5" />
              Create new
            </Link>
          </div>
        ) : (
          <ul className="mt-5 flex flex-wrap gap-5">
            {stories.map((story) => (
              <li
                className="relative max-w-sm px-5 pt-3 pb-16 ring ring-black/5 shadow rounded-lg text-black/80 text-pretty"
                key={story?.id}
              >
                {story && getStory(story.content, story?.genre)}
                <div className="flex w-full px-5 left-0 items-center justify-between gap-3 absolute bottom-3">
                  <Button
                    onClick={() => story && deleteStory(story)}
                    className="cursor-pointer-custom"
                    variant="ghost"
                    size="icon"
                    aria-label="Delete"
                    disabled={isDeleting}
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </Button>
                  <Link
                    href={`/story/${story?.id}`}
                    className={buttonVariants({
                      variant: "link",
                      className: "cursor-pointer-custom",
                    })}
                  >
                    Read the story
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardPageContent;
