import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { MessageType } from "../types";

export const useDeleteMessage = (messageId: string, friendId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete(
        `/message/delete-message/${messageId}`,
      );
      return res.data.data as MessageType;
    },
    onSuccess: () => {
      queryClient.setQueryData<{ pages: MessageType[][] }>(
        ["messages", friendId],
        (old) => {
          if (!old) return old;

          const oldArray = old.pages.flat();
          const newArray = oldArray.filter((m) => m._id !== messageId);
          return {
            ...old,
            pages: [newArray],
          };
        },
      );
    },
  });

  return {
    deleteMessage: mutate,
    isDeleting: isPending,
    isError,
    error,
  };
};
