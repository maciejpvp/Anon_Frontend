import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { MessageType } from "../types";
import { editMessageInCache } from "../featues/messages/editMessageInCache";

type EditMessageInput = {
  message: string;
};

export const useEditMessage = (messageId: string, friendId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async ({ message }: EditMessageInput) => {
      const res = await axiosInstance.post(
        `/message/edit-message/${messageId}`,
        { newText: message },
      );
      return res.data.data as MessageType;
    },
    onSuccess: (editedMessage) => {
      editMessageInCache(queryClient, friendId, editedMessage);
    },
  });

  return {
    editMessage: mutate,
    isSending: isPending,
    isError,
    error,
  };
};
