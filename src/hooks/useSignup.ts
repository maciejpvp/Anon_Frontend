import { useState, useCallback } from "react";
import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "../store/authStore";

interface SignupArgs {
  username: string;
  password: string;
  publicKey: string;
}

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const setUser = useAuthStore((s) => s.setUser);

  const signup = useCallback(
    async (args: SignupArgs) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.post("/auth/register", args);
        setUser(response.data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [setUser]
  );

  return {
    signup,
    isLoading,
    error,
  };
};
