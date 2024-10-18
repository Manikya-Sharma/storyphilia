import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row md:gap-5 justify-center h-screen bg-gradient-to-tl from-black to-green-800">
      <div className="md:flex-1 flex flex-col items-center gap-5 justify-center">
        <h1 className="text-3xl md:text-6xl font-bold text-green-100 tracking-tighter text-center">
          Seems like you are lost
        </h1>
        <Link
          href="https://github.com/Manikya-Sharma/storyphilia/issues"
          target="_blank"
          className="text-green-100 md:text-lg hover:underline flex items-center -mt-2"
        >
          Let us know about broken links
          <ExternalLink className="size-4 ml-1.5" />
        </Link>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "text-base"
          )}
        >
          Go back to home
        </Link>
      </div>
      <div className="md:flex-1 flex flex-col items-center justify-center">
        <img
          src="/whereami.png"
          alt=""
          className="w-3/4 h-3/4 rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default Page;
