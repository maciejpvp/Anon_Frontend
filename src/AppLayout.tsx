import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";

export const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
