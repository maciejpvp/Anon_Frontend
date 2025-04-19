import useSWR from "swr";
import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "../store/authStore";
import { useSocketStore } from "../store/socketStore";

const fetcher = async () => {
  const res = await axiosInstance.get("/auth/checkAuth");
  return res.data;
};

export const useCheckAuth = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const socketConnect = useSocketStore((s) => s.connect);

  const { error, isLoading, mutate } = useSWR("/auth/checkAuth", fetcher, {
    onSuccess: (data) => {
      setUser(data.data);
      console.log(data.data);
      socketConnect(data.data.userId);
    },
    onError: () => {
      console.log("No active session found");
    },
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });

  return {
    isLoading,
    isError: !!error,
    mutate,
  };
};
