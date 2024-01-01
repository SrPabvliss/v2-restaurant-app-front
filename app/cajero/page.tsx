"use client";
import { Divider } from "@nextui-org/react";
import React from "react";
import { ToastContainer } from "react-toastify";
import { useOrdersStore } from "../store/orderStore";
import Order from "./components/Order";

const CashierDahsboard: React.FC = () => {
  const {
    visitsServed,
    getVisitsMasterOrders,
    filterVisitsServed,
    loadOrders,
  } = useOrdersStore();

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    loadOrders();
    getVisitsMasterOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isClient && (
        <div>
          <ToastContainer position="top-center" />
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-2xl text-slate-100 py-4">
              Ordenenes completadas
            </h1>
            <Divider className="bg-slate-100 mb-4" />

            <div className="grid grid-cols-3 gap-4 w-7/12">
              {visitsServed?.map((visit, index) => (
                //generar key aleatorio} />
                <Order visit={visit} key={visit.id + index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierDahsboard;
