import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Chat } from "./pages/Chat";
import { useCheckAuth } from "./hooks/useCheckAuth";
import { useAuthStore } from "./store/authStore";
import { Navbar } from "./components/Navbar/Navbar";

export const App = () => {
  const { isLoading } = useCheckAuth();
  const user = useAuthStore((s) => s.user);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
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
            path="/chat"
            element={user ? <Chat /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/chat" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
