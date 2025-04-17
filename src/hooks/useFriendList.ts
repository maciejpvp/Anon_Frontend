import useSWR from "swr";
import { axiosInstance } from "../utils/axios";

export type FriendType = {
  _id: string;
  username: string;
  publicKey: string;
  profilePic: string;
};

const fetcher = async (url: string) =>
  await axiosInstance.get(url).then((data) => data.data.data); // returns ONLY friends array

export const useFriendList = () => {
  const { data, isLoading } = useSWR<FriendType[]>(
    "/message/get-friend-list",
    fetcher
  );

  return {
    friends: data,
    isLoading,
  };
};
