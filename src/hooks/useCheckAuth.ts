import { useState, useCallback } from "react";
import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "../store/authStore";
import { useSocketStore } from "../store/socketStore";

export const useCheckAuth = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const socketConnect = useSocketStore((s) => s.connect);

  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      setUser(res.data.data);
      socketConnect(res.data.data.userId);
    } catch {
      console.log("No active session found");
    } finally {
      setIsLoading(false);
    }
  }, [setUser, socketConnect]);

  return {
    isLoading,
    refetch: checkAuth,
  };
};
