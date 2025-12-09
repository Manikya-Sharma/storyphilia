import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import StoryPageContent from "./StoryPageContent";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const story = await db.story.findFirst({
    where: {
      id,
    },
  });

  if (!story) {
    return notFound();
  }

  return <StoryPageContent story={story} />;
};

export default Page;
