"use client";

import { ToastContainer } from "react-toastify";
import NavBar from "../components/NavBar";
import { useSocketListeners } from "../api/useOrderReady";
import { useTableSocketListeners } from "../api/useTables";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useSocketListeners();
  useTableSocketListeners();

  return (
    <div
      className="bg-repeat bg-center min-h-screen"
      style={{ backgroundImage: `url('/images/fondoLoginAct.jpg')` }}
    >
      <ToastContainer position="top-center" />
      <NavBar type="mesero" />

      {children}
    </div>
  );
};

export default Layout;
