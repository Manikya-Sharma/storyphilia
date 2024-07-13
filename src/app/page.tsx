import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const dancing_script = Dancing_Script({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="patterned h-full -z-10">
      <div className="pt-24 px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mt-5 gap-10 md:gap-16 pb-20">
          <div>
            <h1
              className={cn(
                "text-7xl lg:text-9xl text-center",
                dancing_script.className
              )}
            >
              Get your{" "}
              <span className="text-pink-800 text-glow">
                creative <br /> juices
              </span>{" "}
              flowing
            </h1>
            <Link
              href="/new"
              className={cn(
                buttonVariants({
                  className: "cursor-pointer-custom",
                }),
                "flex w-fit mt-5 mx-auto "
              )}
            >
              <Plus className="size-5 md:mr-1.5" />
              <span className="hidden md:block">Start now!</span>
            </Link>
          </div>
          <div className="relative">
            <Image
              src="/hero-photo-2.png"
              alt="sample image"
              className="rounded-lg ring ring-offset-2 ring-blue-300"
              width={1431}
              height={832}
            />
            {/* Image effect */}
            <div
              className="absolute top-0 left-0 inset-0 rounded-lg vignette"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
}
