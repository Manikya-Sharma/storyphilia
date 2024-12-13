import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, Copy, Save } from "lucide-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const GeneratedResponse = ({
  creating,
  saving,
  genreValue,
  responseGiven,
  setResponseGiven,
  saveToLibrary,
}: {
  creating: boolean;
  saving: boolean;
  genreValue: string;
  responseGiven: string;
  setResponseGiven: Function;
  saveToLibrary: Function;
}) => {
  return (
    <div className="relative">
      {!creating ? (
        <div className="w-full md:px-5 flex items-center justify-between mb-2">
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
            <ChevronLeft className="size-4 md:mr-1.5" aria-label="Go back" />
            <span className="hidden md:block">Back</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "relative text-sm after:opacity-0 after:content-['copy_to_clipboard'] after:absolute after:-top-10 after:left-1/2 after:-translate-x-1/2 after:bg-[rgba(50,50,50,0.7)] after:backdrop-blur-sm after:px-3 after:py-2 after:rounded-lg hover:after:opacity-100 after:transition-opacity",
              {
                "border border-zinc-500": genreValue === "detective",
              }
            )}
            onClick={() => {
              navigator.clipboard.writeText(responseGiven);
              toast.success("Copied to clipboard");
            }}
            disabled={creating}
          >
            <Copy className="size-4" />
          </Button>
        </div>
      ) : (
        <div className="absolute right-5">
          <div
            className={cn("size-4 rounded-full animate-ping bg-black", {
              "bg-white": ["romance", "detective", "horror"].includes(
                genreValue
              ),
            })}
          />
        </div>
      )}
      <Markdown
        className={cn(
          "prose text-pretty text-zinc-200 prose-h2:text-zinc-200 mx-auto",
          (genreValue === "scifi" ||
            genreValue === "adventure" ||
            genreValue === "romance" ||
            genreValue === "action") &&
            "text-black/90 prose-h2:text-black"
        )}
      >
        {responseGiven}
      </Markdown>
      <div className="w-full flex items-center justify-end gap-5 mt-3">
        <Button
          className={cn({
            "bg-zinc-800 hover:bg-zinc-700": genreValue === "adventure",
            "bg-emerald-800 hover:bg-emerald-700": genreValue === "scifi",
            "bg-orange-800 hover:bg-orange-700": genreValue === "action",
            "bg-slate-200 hover:bg-slate-300 text-zinc-950":
              genreValue === "detective",
          })}
          onClick={() => saveToLibrary()}
          disabled={creating || saving}
        >
          <Save className="size-5 mr-1.5" />
          {saving ? "Saving..." : "Save to library"}
        </Button>
      </div>
    </div>
  );
};

export default GeneratedResponse;
