import { useQueryClient } from "@tanstack/react-query";
import { MessageType } from "../types";

export const useSocketMessage = () => {
  const queryClient = useQueryClient();

  const addMessage = (message: MessageType, friendId: string) => {
    queryClient.setQueryData<{ pages: MessageType[][] }>(
      ["messages", friendId],
      (old) => {
        if (!old) return old;
        const allMessages = old.pages.flat();
        const exists = allMessages.some((m) => m._id === message._id);
        if (exists) return old;

        return {
          ...old,
          pages: [[message, ...old.pages[0]], ...old.pages.slice(1)],
        };
      },
    );
  };

  return { addMessage };
};
