import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export type FriendType = {
  _id: string;
  username: string;
  publicKey: string;
  profilePic: string;
};

const fetchFriendList = async (): Promise<FriendType[]> => {
  const response = await axiosInstance.get("/message/get-friend-list");
  return response.data.data; // returns ONLY friends array
};

export const useFriendList = () => {
  const { data: friends, isLoading } = useQuery({
    queryKey: ["friendList"],
    queryFn: fetchFriendList,
  });

  return {
    friends,
    isLoading,
  };
};
