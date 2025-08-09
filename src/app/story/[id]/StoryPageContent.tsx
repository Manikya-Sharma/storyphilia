"use client";

import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/authUtils";
import { cn } from "@/lib/utils";
import { usePostStory } from "@/queries/story";
import type { Story } from "@prisma/client";
import { Copy, Save } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Markdown from "react-markdown";

const StoryPageContent = ({ story: { genre, content } }: { story: Story }) => {
  const { mutate: postStory, isPending: isPostingStory } = usePostStory({
    onSuccess: () => toast.success("Story posted successfully"),
    onError: () => toast.error("Could not post the story"),
  });

  const saveToLibrary = async () => {
    const user = await getUser();

    if (!user) {
      toast.error("You are not logged in, unable to save the story");
      return;
    }

    postStory({
      userId: user.id,
      content,
      genre,
    });
  };

  return (
    <div
      className={cn("min-h-screen py-10 pt-32", {
        "patterned-scifi": genre === "scifi",
        patterned: genre === "",
        "bg-[url('/adventure-pattern.png')] bg-cover": genre === "adventure",
        "patterned-love": genre === "romance",
        "action-bg": genre === "action",
        "patterned-detective": genre === "detective",
        "bg-black": genre === "horror",
      })}
    >
      <Toaster />
      <div
        className={cn(
          "w-[90vw] max-w-5xl mx-auto rounded-lg shadow-md p-7 border-t",
          {
            "dark glow bg-teal-300 text-teal-950 border-blue-950":
              genre === "scifi",
            "bg-white border-zinc-200 shadow-2xl":
              genre === "" ||
              genre === "adventure" ||
              genre === "romance" ||
              genre === "action",
            patterned: genre === "adventure",
            "bg-gradient-to-br from-rose-200 to-rose-400": genre === "romance",
            "dark glow-white bg-zinc-800 text-zinc-100 border-zinc-950":
              genre === "detective",
            "dark glow-red text-zinc-100 border-zinc-950": genre === "horror",
          },
        )}
      >
        <div className="relative">
          <div className="w-full md:px-5 flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "relative text-sm after:opacity-0 after:content-['copy_to_clipboard'] after:absolute after:-top-10 after:left-1/2 after:-translate-x-1/2 after:bg-[rgba(50,50,50,0.7)] after:backdrop-blur-sm after:px-3 after:py-2 after:rounded-lg hover:after:opacity-100 after:transition-opacity",
                {
                  "border border-zinc-500": genre === "detective",
                },
              )}
              onClick={() => {
                navigator.clipboard.writeText(content);
                toast.success("Copied to clipboard");
              }}
            >
              <Copy className="size-4" />
            </Button>
          </div>

          <Markdown
            className={cn(
              "prose text-pretty text-zinc-200 prose-h2:text-zinc-200 mx-auto",
              (genre === "scifi" ||
                genre === "adventure" ||
                genre === "romance" ||
                genre === "action") &&
                "text-black/90 prose-h2:text-black",
            )}
          >
            {content}
          </Markdown>
          <div className="w-full flex items-center justify-end gap-5 mt-3">
            <Button
              className={cn({
                "bg-zinc-800 hover:bg-zinc-700": genre === "adventure",
                "bg-emerald-800 hover:bg-emerald-700": genre === "scifi",
                "bg-orange-800 hover:bg-orange-700": genre === "action",
                "bg-slate-200 hover:bg-slate-300 text-zinc-950":
                  genre === "detective",
              })}
              onClick={() => saveToLibrary()}
              disabled={isPostingStory}
            >
              <Save className="size-5 mr-1.5" />
              {isPostingStory ? "Saving..." : "Save to your library"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPageContent;
