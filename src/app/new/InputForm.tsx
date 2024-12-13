import { Button } from "@/components/ui/button";
import { Command, CommandGroup } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Dices } from "lucide-react";
import { GENRES } from "../constants/genres";

interface InputFormProps {
  setGenreValue: Function;
  setPromptValue: Function;
  open: boolean;
  setOpen: (open: boolean) => void;
  genreValue: string;
  storySizeRef: React.MutableRefObject<HTMLInputElement | null>;
  max_story_size: number;
  creativityRef: React.MutableRefObject<HTMLInputElement | null>;
  textareaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  submitRequest: Function;
}

const InputForm = ({
  setGenreValue,
  setPromptValue,
  open,
  setOpen,
  genreValue,
  storySizeRef,
  max_story_size,
  creativityRef,
  textareaRef,
  submitRequest,
}: InputFormProps) => {
  return (
    <div>
      {/* Genre Selection */}
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
      {/* Max words and Creativity */}

      <div className="my-5 flex flex-col items-start gap-5">
        <div className="flex items-center justify-center gap-5">
          <Label className="block min-w-fit" htmlFor="story-size">
            Story Size:
          </Label>
          <Input
            ref={storySizeRef}
            className={cn("w-14", genreValue === "scifi" && "text-white")}
            id="story-size"
          />
          <p className="text-sm text-muted-foreground -ml-2">
            words (max {max_story_size})
          </p>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Label className="block" htmlFor="creativity">
            Creativity:
          </Label>
          <Input
            ref={creativityRef}
            className={cn("w-10", genreValue === "scifi" && "text-white")}
            id="creativity"
          />
          <p className="text-sm text-muted-foreground -ml-2">out of 5</p>
        </div>
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
            "border border-zinc-500": genreValue === "detective",
          })}
          variant="secondary"
          onClick={() => {
            submitRequest(true);
          }}
        >
          <Dices className="size-5 mr-1.5" />
          Random story
        </Button>
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
  );
};

export default InputForm;
