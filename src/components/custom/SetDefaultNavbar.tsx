"use client";

import { useNavColorStore } from "@/lib/zustand";

const SetDefaultNavbar = () => {
  const updateNavColor = useNavColorStore(
    (state) => state.updateColorClassName
  );
  updateNavColor(
    "bg-gradient-to-r from-[rgba(225,29,72,0.1)] to-[rgba(225,29,72,0.8)] text-zinc-50"
  );
  return <></>;
};

export default SetDefaultNavbar;
