import useSWR from "swr";
import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "../store/authStore";

const fetcher = async () => {
  const res = await axiosInstance.get("/auth/checkAuth");
  return res.data; // zakładam że zwraca { user: { id, username } }
};

export const useCheckAuth = () => {
  const setUser = useAuthStore((s) => s.setUser);

  const { error, isLoading, mutate } = useSWR("/auth/checkAuth", fetcher, {
    onSuccess: (data) => {
      setUser(data.data);
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
