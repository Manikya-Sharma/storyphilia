"use client";

import { cn } from "@/lib/utils";
import { PencilRuler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <div className="border-b border-slate-100 z-50 h-16 px-10 py-5 bg-gradient-to-r from-[rgba(225,29,72,0.1)] to-[rgba(225,29,72,0.8)] text-zinc-50 backdrop-blur-sm fixed inset-x-0 md:w-[60vw] md:left-1/2 md:-translate-x-1/2 md:rounded-lg md:mt-5 cursor-custom">
      <Link href="/" className="cursor-pointer-custom">
        <Image
          src="/logo.svg"
          alt="logo"
          width={200}
          height={150}
          className={cn(
            "fixed top-5 -mt-7",
            pathName.includes("/new") ? "left-1/2 -translate-x-1/2" : "left-5"
          )}
        />
      </Link>
      {pathName.includes("/new") ? null : (
        <div className="text-white w-fit ml-auto -mt-2">
          <motion.div
            whileTap={{
              scale: 0.9,
            }}
          >
            <Link
              href="/new"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  className: "cursor-pointer-custom",
                })
              )}
            >
              <PencilRuler className="size-5 mr-1.5" />
              Create New
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
