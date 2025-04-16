import useSWRMutation from "swr/mutation";
import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "../store/authStore";

interface LoginArgs {
  username: string;
  password: string;
}

const loginFetcher = async (url: string, { arg }: { arg: LoginArgs }) => {
  const response = await axiosInstance.post(url, arg);
  return response.data;
};

export const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser);
  return useSWRMutation("/auth/login", loginFetcher, {
    onSuccess: (data) => {
      console.log(data.data);
      setUser(data.data);
    },
    onError: (data) => {
      console.log(data);
    },
  });
};
