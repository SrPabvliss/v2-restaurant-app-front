"use client";

import React from "react";
import OrdersBoard from "./components/OrdersBoard";

const ChefDahsboard: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex justify-center py-6 max-h-screen">
      {isClient && <OrdersBoard />}
    </div>
  );
};

export default ChefDahsboard;
