import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, Copy } from "lucide-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const GeneratedResponse = ({
  creating,
  genreValue,
  responseGiven,
  setResponseGiven,
}: {
  creating: boolean;
  genreValue: string;
  responseGiven: string;
  setResponseGiven: Function;
}) => {
  return (
    <div className="relative">
      {!creating ? (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-5 text-sm after:opacity-0 after:content-['copy_to_clipboard'] after:absolute after:-top-10 after:left-1/2 after:-translate-x-1/2 after:bg-[rgba(50,50,50,0.7)] after:backdrop-blur-sm after:px-3 after:py-2 after:rounded-lg hover:after:opacity-100 after:transition-opacity",
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
      <Markdown className="prose dark:text-zinc-200 dark:prose-h2:text-zinc-200 mx-auto">
        {responseGiven}
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
  );
};

export default GeneratedResponse;
