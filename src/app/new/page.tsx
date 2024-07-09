"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GENRES } from "../constants/genres";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [genreValue, setGenreValue] = useState("");

  return (
    <div
      className={cn("min-h-screen pt-32", {
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
      <div
        className={cn(
          "w-[90vw] max-w-prose mx-auto rounded-lg shadow-md p-7 border-t",
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
                  ? GENRES.find((genre) => genre.value === genreValue)?.label
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
      </div>
    </div>
  );
};

export default Page;
