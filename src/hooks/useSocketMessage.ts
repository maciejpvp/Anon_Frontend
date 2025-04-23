import { useQueryClient } from "@tanstack/react-query";
import { MessageType } from "../types";

export const useSocketMessage = () => {
  const queryClient = useQueryClient();

  const addMessage = (message: MessageType, friendId: string) => {
    queryClient.setQueryData<MessageType[]>(["messages", friendId], (old) => {
      const exists = old?.some((m) => m._id === message._id);
      if (exists) return old;
      return old ? [message, ...old] : [message];
    });
  };

  return { addMessage };
};
