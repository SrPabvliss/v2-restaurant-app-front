"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WaiterNavBar from "../components/NavBar";
import { useSocketListeners } from "../api/useOrderReady";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useSocketListeners();

  return (
    <div
      className="bg-repeat bg-center min-h-screen"
      style={{ backgroundImage: `url('/images/fondoLoginAct.jpg')` }}
    >
      <ToastContainer position="top-center" />
      <WaiterNavBar />

      {children}
    </div>
  );
};

export default Layout;
