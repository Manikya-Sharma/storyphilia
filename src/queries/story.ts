import type { Story } from "@prisma/client";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

export const useGetUserStories = ({ userId }: { userId: string }) => {
  return useQuery({
    queryFn: async () => {
      const data = await fetch(`/api/user/stories?userId=${userId}`);
      return (await data.json()) as Array<{ id: string }>;
    },
    queryKey: ["getStoryIds", userId],
  });
};

const getStory = async ({ id }: { id: string }) => {
  const data = await fetch(`/api/story?id=${id}`);
  return (await data.json()) as Story | null;
};

export const useGetStory = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: async () => await getStory({ id }),
    queryKey: ["getStory", id],
  });
};

export const useGetStories = ({ ids }: { ids: string[] }) => {
  return useQueries({
    queries: ids.map((id) => ({
      queryFn: async () => await getStory({ id }),
      queryKey: ["getStory", id],
    })),
  });
};

export const usePostStory = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: async ({
      userId,
      content,
      genre,
    }: {
      userId: string;
      content: string;
      genre: string;
    }) => {
      const data = await fetch("/api/story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, content, genre }),
      });
      return (await data.json()) as { id: string };
    },
    onSuccess,
    onError,
  });
};

export const useDeleteStory = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (
    data: void,
    { userId, id }: { userId: string; id: string },
  ) => void;
  onError?: () => void;
} = {}) => {
  return useMutation({
    mutationFn: async ({ userId, id }: { userId: string; id: string }) => {
      await fetch(`/api/story?id=${id}&userId=${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess,
    onError,
  });
};
