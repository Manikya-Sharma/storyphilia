"use client";

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { GenAiRequest } from "@/types/genai-types";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useNavColorStore } from "@/lib/zustand";
import GeneratedResponse from "./GeneratedResponse";
import InputForm from "./InputForm";
import { MAX_STORY_SIZE } from "../constants/config";
import { usePostStory } from "@/queries/story";
import { getUserQuery } from "@/queries/user";
import { authClient } from "@/auth-client";

const Page = () => {
  const { data: session } = authClient.useSession();
  const { data: user } = getUserQuery({
    userEmail: session?.user.email,
  });

  const [open, setOpen] = useState(false);
  const [genreValue, setGenreValue] = useState("");
  const [promptValue, setPromptValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const storySizeRef = useRef<HTMLInputElement | null>(null);
  const creativityRef = useRef<HTMLInputElement | null>(null);

  const [kidsStory, setKidsStory] = useState<boolean>(false);

  const [responseGiven, setResponseGiven] = useState<string | null>(null);

  const { mutate: postStory, isPending: isPostingStory } = usePostStory({
    onSuccess: () => {
      toast.success("Posted successfully");
    },
    onError: () => {
      toast.error("Could not post the story");
    },
  });

  async function submitRequest(customInvocation: boolean = false) {
    if (!storySizeRef.current || !creativityRef.current) {
      return;
    }
    setLoading(true);
    // check for invalid data
    if (!customInvocation && promptValue.trim().length === 0) {
      toast.error("Empty prompt not allowed!");
      textareaRef.current?.focus();
      setLoading(false);
      return;
    }
    if (genreValue === "") {
      toast.error("Please select a genre!");
      setOpen(true);
      setLoading(false);
      return;
    }
    if (promptValue.split(" ").length > 100) {
      toast.error("The prompt is too big, consider making it smaller");
      setLoading(false);
      return;
    }
    const storySize = Number(storySizeRef.current.value);
    if (Number.isNaN(storySize)) {
      toast.error(`Story size should be a valid number`);
      storySizeRef.current.focus();
      setLoading(false);
      return;
    }
    if (
      !Number.isInteger(storySize) ||
      storySize > MAX_STORY_SIZE ||
      storySize < 5
    ) {
      toast.error(`Story size ${storySize} is invalid for a short story`);
      storySizeRef.current.focus();
      setLoading(false);
      return;
    }

    const creativity = Number(creativityRef.current.value);
    if (Number.isNaN(creativity)) {
      toast.error(`Creativity level should be a valid number`);
      creativityRef.current.focus();
      setLoading(false);
      return;
    }
    if (!Number.isInteger(creativity) || creativity > 5 || creativity < 1) {
      toast.error("Creativity level must be a number from 1 to 5");
      creativityRef.current.focus();
      setLoading(false);
      return;
    }

    // send the data to api
    const dataSent: GenAiRequest = {
      genre: genreValue,
      message: promptValue,
      creativity: creativity,
      max_words: storySize,
      customInvocation,
    };
    const response = await fetch("/api/ai-request", {
      method: "POST",
      body: JSON.stringify(dataSent),
    });

    if (!response.ok || !response.body) {
      // Most probably, api request limit exceeded
      toast.error(
        "Sorry, google GenAI token limit has exceeded, please try again later",
      );
      setLoading(false);
      return;
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";

    setLoading(false);
    setCreating(true);
    // Process the stream
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      setResponseGiven(buffer);
    }

    setCreating(false);
  }

  const saveToLibrary = async () => {
    if (!responseGiven) {
      toast.error("The story is not generated yet!");
      return;
    }

    if (!user) {
      toast.error("You are not logged in, unable to save the story");
      return;
    }

    postStory({
      userId: user.id,
      content: responseGiven,
      genre: genreValue,
    });
  };

  // Navbar color
  const updateNavColor = useNavColorStore(
    (state) => state.updateColorClassName,
  );
  useEffect(() => {
    switch (genreValue) {
      case "scifi":
        updateNavColor("bg-teal-300 text-zinc-50");
        break;
      case "adventure":
        updateNavColor("patterned shadow-lg border border-black/10");
        break;
      case "romance":
        updateNavColor("bg-rose-200");
        break;
      case "action":
        updateNavColor("bg-white");
        break;
      case "detective":
        updateNavColor("bg-gradient-to-br from-zinc-700 to-zinc-800 shadow-md");
        break;
      case "horror":
        updateNavColor("bg-red-800/70");
        break;
    }
  }, [genreValue, updateNavColor]);

  return (
    <div
      className={cn("min-h-screen py-10 pt-32", {
        "patterned-scifi": genreValue === "scifi",
        patterned: genreValue === "",
        "bg-[url('/adventure-pattern.png')] bg-cover":
          genreValue === "adventure",
        "patterned-love": genreValue === "romance",
        "action-bg": genreValue === "action",
        "patterned-detective": genreValue === "detective",
        "bg-black": genreValue === "horror",
      })}
    >
      <Toaster />
      <div
        className={cn(
          "w-[90vw] max-w-5xl mx-auto rounded-lg shadow-md p-7 border-t",
          {
            "dark glow bg-teal-300 text-teal-950 border-blue-950":
              genreValue === "scifi",
            "bg-white border-zinc-200 shadow-2xl":
              genreValue === "" ||
              genreValue === "adventure" ||
              genreValue === "romance" ||
              genreValue === "action",
            patterned: genreValue === "adventure",
            "bg-gradient-to-br from-rose-200 to-rose-400":
              genreValue === "romance",
            "dark glow-white bg-zinc-800 text-zinc-100 border-zinc-950":
              genreValue === "detective",
            "dark glow-red text-zinc-100 border-zinc-950":
              genreValue === "horror",
          },
        )}
      >
        {loading ? (
          <div className="h-full min-h-[50vh] w-full flex flex-col items-center justify-center gap-2">
            <Loader2 className="size-5 animate-spin" />
            <p>Cooking up your {genreValue} story...</p>
          </div>
        ) : responseGiven ? (
          <GeneratedResponse
            kidsStory={kidsStory}
            setKidsStory={setKidsStory}
            creating={creating}
            saving={isPostingStory}
            genreValue={genreValue}
            responseGiven={responseGiven}
            setResponseGiven={setResponseGiven}
            saveToLibrary={saveToLibrary}
          />
        ) : (
          <InputForm
            kidsStory={kidsStory}
            setKidsStory={setKidsStory}
            creativityRef={creativityRef}
            genreValue={genreValue}
            max_story_size={MAX_STORY_SIZE}
            open={open}
            setGenreValue={setGenreValue}
            setOpen={setOpen}
            setPromptValue={setPromptValue}
            storySizeRef={storySizeRef}
            submitRequest={submitRequest}
            textareaRef={textareaRef}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
