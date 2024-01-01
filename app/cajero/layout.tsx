"use client";

import { useTableSocketListeners } from "../api/useTables";
import NavBar from "../components/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useTableSocketListeners();

  return (
    <div
      className="bg-repeat bg-center min-h-screen"
      style={{ backgroundImage: `url('/images/fondoLoginAct.jpg')` }}
    >
      <NavBar type="cajero" />
      {children}
    </div>
  );
};

export default Layout;
