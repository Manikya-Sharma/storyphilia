"use client";

import { Check, ChevronLeft, ChevronsUpDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { GENRES } from "../constants/genres";
import { Textarea } from "@/components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";
import { GenAiRequest } from "@/types/genai-types";

import Markdown from "react-markdown";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [genreValue, setGenreValue] = useState("");
  const [promptValue, setPromptValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [responseGiven, setResponseGiven] = useState<string | null>(null);

  async function submitRequest() {
    setLoading(true);
    // check for invalid data
    if (promptValue.trim().length === 0) {
      toast.error("Empty prompt not allowed!");
      textareaRef.current?.focus();
      setLoading(false);
      return;
    }
    if (genreValue === "") {
      toast.error("Please select a genre!");
      setOpen(true);
      setLoading(false);
      return;
    }
    if (promptValue.split(" ").length > 100) {
      toast.error("The prompt is too big, consider making it smaller");
      setLoading(false);
      return;
    }
    // send the data to api
    const dataSent: GenAiRequest = {
      genre: genreValue,
      message: promptValue,
    };
    const response = await fetch("/api/ai-request", {
      method: "POST",
      body: JSON.stringify(dataSent),
    });

    if (!response.ok) {
      // Most probably, api request limit exceeded
      toast.error(
        "Sorry, google GenAI token limit has exceeded, please try again later"
      );
      setLoading(false);
      return;
    }
    const { message } = (await response.json()) as { message: string };
    setResponseGiven(message);
    setLoading(false);
  }

  return (
    <div
      className={cn("min-h-screen py-10 pt-32", {
        "patterned-scifi": genreValue === "scifi",
        patterned: genreValue === "",
        "bg-[url('/adventure-pattern.png')] bg-cover":
          genreValue === "adventure",
        "patterned-love": genreValue === "romance",
        "action-bg": genreValue === "action",
        "patterned-detective": genreValue === "detective",
        "bg-black": genreValue === "horror",
      })}
    >
      <Toaster />
      <div
        className={cn(
          "w-[90vw] max-w-5xl mx-auto rounded-lg shadow-md p-7 border-t",
          {
            "dark glow bg-teal-300 text-teal-950 border-blue-950":
              genreValue === "scifi",
            "bg-white border-zinc-200 shadow-2xl":
              genreValue === "" ||
              genreValue === "adventure" ||
              genreValue === "romance" ||
              genreValue === "action",
            patterned: genreValue === "adventure",
            "bg-gradient-to-br from-rose-200 to-rose-400":
              genreValue === "romance",
            "dark glow-white bg-zinc-800 text-zinc-100 border-zinc-950":
              genreValue === "detective",
            "dark glow-red text-zinc-100 border-zinc-950":
              genreValue === "horror",
          }
        )}
      >
        {loading ? (
          <div className="h-full min-h-[50vh] w-full flex items-center justify-center">
            <Loader2 className="size-5 animate-spin" />
          </div>
        ) : responseGiven ? (
          <div>
            <Markdown className="prose dark:text-zinc-200 dark:prose-h2:text-zinc-200 mx-auto">
              {responseGiven.replace("<br />", "\n")}
            </Markdown>
            <div className="w-full flex items-center justify-end gap-5">
              <Button
                className={cn({
                  "bg-zinc-800 hover:bg-zinc-700": genreValue === "adventure",
                  "bg-emerald-800 hover:bg-emerald-700": genreValue === "scifi",
                  "bg-orange-800 hover:bg-orange-700": genreValue === "action",
                  "bg-slate-200 hover:bg-slate-300 text-zinc-950":
                    genreValue === "detective",
                })}
                onClick={() => {
                  setResponseGiven(null);
                }}
              >
                <ChevronLeft className="size-4 mr-1.5" />
                Go Back
              </Button>
            </div>
          </div>
        ) : (
          // Genre Selection
          <div>
            <div className="flex items-center justify-center gap-5">
              <label className="cursor-custom">Select the story genre</label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between dark:text-white", {
                      "dark:bg-teal-900": genreValue === "scifi",
                      "dark:bg-zinc-900": genreValue === "detective",
                    })}
                  >
                    {genreValue
                      ? GENRES.find((genre) => genre.value === genreValue)
                          ?.label
                      : "No genre selected"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandGroup heading="Select your genre">
                      <ul>
                        {GENRES.map((genre) => (
                          <Button
                            className={cn(
                              "block w-full text-left",
                              genreValue === genre.value && "bg-zinc-100"
                            )}
                            variant="ghost"
                            key={genre.value}
                            onClick={() => {
                              setGenreValue(genre.value);
                              setOpen(false);
                            }}
                          >
                            {genreValue === genre.value ? (
                              <Check className="size-4 mr-1.5 inline-block" />
                            ) : (
                              <div className="inline-block size-4 mr-1.5"></div>
                            )}
                            {genre.label}
                          </Button>
                        ))}
                      </ul>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            {/* Prompt */}

            <div className="mt-5">
              <h2 className="font-bold">Describe the story in 100 words</h2>
              <p
                className={cn(
                  "text-muted-foreground text-sm dark:text-muted",
                  (genreValue === "horror" || genreValue === "detective") &&
                    "dark:text-zinc-300"
                )}
              >
                You can give a hint of the story, or even explain one
              </p>
              <Textarea
                ref={textareaRef}
                onChange={() => {
                  if (textareaRef.current) {
                    setPromptValue(textareaRef.current.value);
                  }
                }}
                className="mt-5 border-zinc-400 focus-visible:ring-blue-400 dark:text-zinc-100"
              ></Textarea>
            </div>
            {/* Submit Button */}
            <div className="w-full flex items-center justify-end gap-5 mt-5">
              <Button
                className={cn({
                  "bg-zinc-800 hover:bg-zinc-700": genreValue === "adventure",
                  "bg-emerald-800 hover:bg-emerald-700": genreValue === "scifi",
                  "bg-orange-800 hover:bg-orange-700": genreValue === "action",
                  "bg-slate-200 hover:bg-slate-300 text-zinc-950":
                    genreValue === "detective",
                })}
                onClick={() => {
                  submitRequest();
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
