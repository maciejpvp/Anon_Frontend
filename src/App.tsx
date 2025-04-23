import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Chat } from "./pages/Chat";
import { useCheckAuth } from "./hooks/useCheckAuth";
import { useAuthStore } from "./store/authStore";
import { FullPageLoadingSpinner } from "./components/FullPageLoadingSpinner";
import { useEffect } from "react";
import { AppLayout } from "./AppLayout";
import { SettingsPage } from "./pages/SettingsPage";

export const App = () => {
  const { isLoading, refetch } = useCheckAuth();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <FullPageLoadingSpinner />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="chat" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="chat" /> : <Signup />}
          />
          <Route
            path="/"
            element={user ? <AppLayout /> : <Navigate to="/login" />}
          >
            <Route path="/chat/:roomId?" element={<Chat />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/chat" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
