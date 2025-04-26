import { useQueryClient } from "@tanstack/react-query";
import { MessageType } from "../types";
import { editMessageInCache } from "../featues/messages/editMessageInCache";

export const useSocketEditMessage = () => {
  const queryClient = useQueryClient();

  const editMessage = (message: MessageType, friendId: string) => {
    editMessageInCache(queryClient, friendId, message);
  };

  return { editMessage };
};
