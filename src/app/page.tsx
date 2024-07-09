import { cn } from "@/lib/utils";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";

const dancing_script = Dancing_Script({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="patterned h-full -z-10">
      <div className="pt-24 px-10">
        <div className="flex flex-col items-center justify-between mt-5 gap-10 md:gap-16 pb-20">
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
          <Image
            src="/hero-photo.png"
            alt="sample image"
            className="rounded-lg ring ring-offset-2 ring-blue-300"
            width={1431}
            height={832}
          />
        </div>
      </div>
    </main>
  );
}
