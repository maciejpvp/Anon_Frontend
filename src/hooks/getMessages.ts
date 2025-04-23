import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { MessageType } from "../types";

const fetchMessages = async (
  friendId: string,
  pageParam?: string
): Promise<MessageType[]> => {
  const res = await axiosInstance.get(`/message/get-messages/${friendId}`, {
    params: {
      beforeDate: pageParam,
      limit: 30,
    },
  });

  return res.data.messages;
};

export const useMessages = (friendId: string) => {
  const query = useInfiniteQuery<
    MessageType[],
    Error,
    InfiniteData<MessageType[]>,
    string[],
    string | undefined
  >({
    queryKey: ["messages", friendId],
    queryFn: async ({ pageParam }) => {
      return fetchMessages(friendId, pageParam);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length < 30) return undefined;
      return new Date(lastPage[lastPage.length - 1].createdAt).toISOString();
    },
    enabled: !!friendId,
  });

  return {
    messages: query.data?.pages.flat() ?? [],
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isPending,
  };
};
