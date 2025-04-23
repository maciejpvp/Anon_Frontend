import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { MessageType } from "../types";

type SendMessageInput = {
  message: string;
};

export const useSendMessage = (friendId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async ({ message }: SendMessageInput) => {
      const res = await axiosInstance.post(
        `/message/send-message/${friendId}`,
        {
          message,
        }
      );
      return res.data.data as MessageType;
    },
    onSuccess: (newMessage) => {
      queryClient.setQueryData<MessageType[]>(["messages", friendId], (old) => {
        const exist = old?.some((m) => m._id === newMessage._id);
        if (exist) return old;
        return old ? [newMessage, ...old] : [newMessage];
      });
    },
  });

  return {
    sendMessage: mutate,
    isSending: isPending,
    isError,
    error,
  };
};
