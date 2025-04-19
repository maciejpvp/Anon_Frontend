import { useQueryClient } from "@tanstack/react-query";
import { MessageType } from "../types";

export const useSocketMessage = () => {
  const queryClient = useQueryClient();

  const addMessage = (message: MessageType, friendId: string) => {
    queryClient.setQueryData<MessageType[]>(["messages", friendId], (old) =>
      old ? [...old, message] : [message]
    );
  };

  return { addMessage };
};
