"use client";

import { cn } from "@/lib/utils";
import { LogIn, StarsIcon, Warehouse } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { useNavColorStore } from "@/lib/zustand";

const ClientSideNavbar = ({ user }: { user?: User }) => {
  const navColor = useNavColorStore((state) => state.colorClassName);

  const pathName = usePathname();
  return (
    <div>
      <div
        className={cn(
          "z-50 h-16 px-10 py-5 backdrop-blur-2xl fixed inset-x-0 md:w-[60vw] md:left-1/2 md:-translate-x-1/2 md:rounded-lg md:mt-5 cursor-custom",
          navColor
        )}
      >
        <Link href="/" className="cursor-pointer-custom">
          <Image
            src="/logo.svg"
            alt="logo"
            width={200}
            height={150}
            className={cn("fixed top-5 -mt-7")}
          />
        </Link>
        <div className="text-white w-fit ml-auto -mt-2">
          {!user ? (
            <div className="flex items-center gap-3">
              {pathName.includes("/new") ? null : (
                <Link
                  href="/new"
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      className: "cursor-pointer-custom",
                    })
                  )}
                >
                  <span className="hidden md:block">Try as guest</span>
                  <StarsIcon className="size-5 md:ml-1.5" />
                </Link>
              )}
              {pathName.includes("/login") ? null : (
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({
                      variant: "secondary",
                      className: "cursor-pointer-custom",
                    })
                  )}
                >
                  <span className="hidden md:block">Login</span>
                  <LogIn className="size-5 md:ml-1.5" />
                </Link>
              )}
            </div>
          ) : (
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  className: "cursor-pointer-custom",
                })
              )}
            >
              <Warehouse className="size-5 md:mr-1.5" />
              <span className="hidden md:block">Go to dashboard</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientSideNavbar;
