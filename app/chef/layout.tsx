"use client";

import WaiterNavBar from "../components/NavBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="bg-repeat bg-center min-h-screen"
      style={{ backgroundImage: `url('/images/fondoLoginAct.jpg')` }}
    >
      <WaiterNavBar />
      <ToastContainer position="top-center" />

      {children}
    </div>
  );
};

export default Layout;
