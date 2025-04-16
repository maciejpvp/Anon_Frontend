import useSWRMutation from "swr/mutation";
import { axiosInstance } from "../utils/axios";

interface SignupArgs {
  username: string;
  password: string;
  publicKey: string;
}

const signupFetcher = async (url: string, { arg }: { arg: SignupArgs }) => {
  const response = await axiosInstance.post(url, arg);
  return response.data;
};

export const useSignup = () => {
  return useSWRMutation("/auth/register", signupFetcher, {});
};
