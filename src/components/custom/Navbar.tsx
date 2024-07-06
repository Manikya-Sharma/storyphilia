import Image from "next/image";
import { Button } from "../ui/button";
import { PencilRuler } from "lucide-react";

const Navbar = () => {
  return (
    <div className="border-b border-slate-100 z-50 h-16 px-10 py-5 bg-gradient-to-r from-[rgba(225,29,72,0.1)] to-[rgba(225,29,72,0.8)] text-zinc-50 backdrop-blur-sm fixed inset-x-0 md:w-[60vw] md:left-1/2 md:-translate-x-1/2 md:rounded-lg md:mt-5 cursor-custom">
      <Image
        src="/logo.svg"
        alt="logo"
        width={200}
        height={150}
        className="fixed top-5 left-5 -mt-7"
      />
      <div className="text-white text-right -mt-2">
        <Button variant="secondary">
          <PencilRuler className="size-5 mr-1.5" />
          Create New
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
