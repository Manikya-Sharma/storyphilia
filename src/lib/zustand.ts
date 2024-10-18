import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type NavbarState = {
  colorClassName: string;
  updateColorClassName: (newClassName: string) => void;
};

export const useNavColorStore = create<NavbarState>()(
  persist(
    (set) => ({
      colorClassName:
        "bg-gradient-to-r from-[rgba(225,29,72,0.1)] to-[rgba(225,29,72,0.8)] text-zinc-50",
      updateColorClassName: (newClassName: string) =>
        set(() => ({ colorClassName: newClassName })),
    }),
    {
      name: "navbar-color",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
