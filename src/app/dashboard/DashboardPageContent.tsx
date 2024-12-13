"use client";
import SetDefaultNavbar from "@/components/custom/SetDefaultNavbar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Story, User } from "@prisma/client";
import { Loader2, Pen, Rabbit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const getStory = (content: string, genre: string) => {
  return (
    <div>
      <Badge className="block absolute -top-2 -right-3">{genre}</Badge>
      {content.length <= 300 ? content : content.slice(0, 300) + " ..."}
    </div>
  );
};

const DashboardPageContent = ({ user }: { user: User }) => {
  const [stories, setStories] = useState<Array<Story>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [isDeleting, setIsDeleting] = useState<Story | null>(null);

  const deleteStory = async (story: Story) => {
    setIsDeleting(story);
    await fetch("/api/story", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        storyId: story.id,
      }),
    });
    setIsDeleting(null);
    setStories([...stories].filter((st) => st !== story));
  };

  useEffect(() => {
    async function getStories() {
      const response = await fetch("/api/story/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
        cache: "no-cache",
      });
      const stories = (await response.json()) as Array<Story>;
      setStories(stories);
      setLoading(false);
    }
    getStories();
  }, [user.id]);

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
                })
              )}
            >
              <Pen className="size-4 mr-1.5" />
              Create new
            </Link>
          </div>
        )}
        {loading ? (
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
                })
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
                key={story.id}
              >
                {getStory(story.content, story.genre)}
                <div className="flex w-full px-5 left-0 items-center justify-between gap-3 absolute bottom-3">
                  <Button
                    onClick={() => deleteStory(story)}
                    className="cursor-pointer-custom"
                    variant="ghost"
                    size="icon"
                    aria-label="Delete"
                    disabled={isDeleting !== null}
                  >
                    {isDeleting === story ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4 text-red-500" />
                    )}
                  </Button>
                  <Link
                    href={`/story/${story.id}`}
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
