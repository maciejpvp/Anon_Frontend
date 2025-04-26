import { QueryClient } from "@tanstack/react-query";
import { MessageType } from "../../types";

export const editMessageInCache = (
  queryClient: QueryClient,
  friendId: string,
  message: MessageType,
) => {
  queryClient.setQueryData<{ pages: MessageType[][] }>(
    ["messages", friendId],
    (old) => {
      if (!old) return old;

      return {
        ...old,
        pages: old.pages.map((page) =>
          page.map((msg) => (msg._id === message._id ? message : msg)),
        ),
      };
    },
  );
};
