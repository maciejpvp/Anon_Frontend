import { useState, useCallback } from "react";
import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "../store/authStore";

interface LoginArgs {
  username: string;
  password: string;
}

export const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const login = useCallback(
    async ({ username, password }: LoginArgs) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.post("/auth/login", {
          username,
          password,
        });

        setUser(response.data.data);
        return response.data.data;
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
    login,
    isLoading,
    error,
  };
};
