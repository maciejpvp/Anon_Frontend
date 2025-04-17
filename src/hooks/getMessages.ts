import useSWR from "swr";
import { axiosInstance } from "../utils/axios";

export type FriendType = {
  _id: string;
  username: string;
  publicKey: string;
  profilePic: string;
};

const fetcher = async (url: string) =>
  await axiosInstance.get(url).then((data) => data.data.messages);

export const useMessages = (friendId: string) => {
  const { data, isLoading } = useSWR<FriendType[]>(
    `/message/get-messages/${friendId}`,
    fetcher
  );

  return {
    messages: data,
    isLoading,
  };
};
