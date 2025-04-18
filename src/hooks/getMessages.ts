import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export type MessageType = {
  receiverId: string;
  senderId: string;
  text: string;
  createdAt: Date;
};

const fetchMessages = async (friendId: string): Promise<MessageType[]> => {
  const response = await axiosInstance.get(`/message/get-messages/${friendId}`);
  return response.data.messages;
};

export const useMessages = (friendId: string) => {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ["messages", friendId],
    queryFn: () => fetchMessages(friendId),
    enabled: !!friendId,
  });

  return {
    messages: data,
    isLoading,
  };
};
