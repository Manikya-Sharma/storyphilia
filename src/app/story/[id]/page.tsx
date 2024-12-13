import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import StoryPageContent from "./StoryPageContent";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
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
