import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  ArrowBigLeft,
  ArrowBigRight,
  ChevronLeft,
  Copy,
  Loader2,
  Save,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import HTMLFlipBook from "react-pageflip";

const splitToPages = ({
  content,
  wordsPerPage,
}: {
  content: string;
  wordsPerPage: number;
}): Array<string> => {
  const words = content.split(" ");
  const pages = [];
  let page = "";
  for (let i = 0; i < words.length; i++) {
    if (page.split(" ").length >= wordsPerPage) {
      pages.push(page);
      page = "";
    }
    page += words[i] + " ";
  }
  pages.push(page);
  return pages;
};

const GeneratedResponse = ({
  creating,
  saving,
  genreValue,
  responseGiven,
  setResponseGiven,
  saveToLibrary,
  kidsStory,
  setKidsStory,
}: {
  creating: boolean;
  saving: boolean;
  genreValue: string;
  responseGiven: string;
  setResponseGiven: Function;
  saveToLibrary: Function;
  kidsStory: boolean;
  setKidsStory: Function;
}) => {
  const bookRef = useRef<any | null>(null);
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const wordsPerPage = width < 500 ? 50 : width < 600 ? 100 : 150;

  const pages = splitToPages({ content: responseGiven, wordsPerPage });

  return kidsStory ? (
    <div>
      {creating ? (
        <div className="h-full min-h-[50vh] w-full flex flex-col items-center justify-center gap-2">
          <Loader2 className="size-5 animate-spin" />
          <p>Adding finishing touches...</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-2 ml-auto w-fit -mt-2 mb-2">
            <Button onClick={() => bookRef.current?.pageFlip().flipPrev()}>
              <ArrowBigLeft className="size-5 ml-1.5" />
              Previous page
            </Button>
            <Button onClick={() => bookRef.current?.pageFlip().flipNext()}>
              Next page
              <ArrowBigRight className="size-5 ml-1.5" />
            </Button>
          </div>
          <div className="bg-black/30 rounded-lg">
            {/* @ts-expect-error There is some issue with provided types but our code is correct */}
            <HTMLFlipBook
              ref={bookRef}
              width={550}
              height={733}
              size="stretch"
              minWidth={315}
              maxWidth={1000}
              minHeight={420}
              maxHeight={1533}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
            >
              {pages.map((page, index) => (
                <div key={index} className="bg-white p-5">
                  <Markdown className="prose text-pretty text-zinc-800 prose-h2:text-zinc-200 mx-auto">
                    {page + (index !== pages.length - 1 ? "..." : "\n THE END")}
                  </Markdown>
                </div>
              ))}
            </HTMLFlipBook>
          </div>
          <div className="mt-2 flex items-center justify-between gap-5 w-full md:px-5">
            <div>
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
                <ChevronLeft
                  className="size-4 md:mr-1.5"
                  aria-label="Go back"
                />
                <span className="hidden md:block">Back</span>
              </Button>
            </div>
            <div className="flex items-center gap-1.5 w-fit">
              <Label className="cursor-pointer-custom" htmlFor="kids-story">
                Story book
              </Label>
              <Switch
                checked={kidsStory}
                onCheckedChange={() => setKidsStory(!kidsStory)}
                id="kids-story"
              />
            </div>
          </div>
        </>
      )}
    </div>
  ) : (
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
      <div className="w-full flex items-center justify-between gap-5 mt-3">
        <div className="flex items-center gap-1.5 w-fit">
          <Label className="cursor-pointer-custom" htmlFor="kids-story">
            Story book
          </Label>
          <Switch
            checked={kidsStory}
            onCheckedChange={() => setKidsStory(!kidsStory)}
            id="kids-story"
          />
        </div>
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
