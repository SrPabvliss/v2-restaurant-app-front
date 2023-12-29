"use client";
import React, { useEffect, useState, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useProductStore } from "../store/productStore";
import { useUserStore } from "../store/userStore";
import { useTableStore } from "../store/tableWsStore";
import { Divider, Spinner } from "@nextui-org/react";
import AvailableTable from "./components/AvailableTable";
import OcuppiedTable from "./components/OcuppiedTable";
import { socket } from "../api/socket";

const WaiterDashboard: React.FC = () => {
  const { productsLoaded, loadProducts, areProductsLoading } =
    useProductStore();

  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { user } = useUserStore();

  const {
    tables,
    loadTables,
    availableTables,
    occupiedTables,
    areTablesLoading,
  } = useTableStore();

  useEffect(() => {
    if (!tables) {
      loadTables();
    }
    if (!user) {
      router.push("/");
    }
    if (!productsLoaded) {
      loadProducts();
    }
    setIsClient(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    productsLoaded,
    loadProducts,
    tables,
    occupiedTables,
    availableTables,
    user,
  ]);

  return (
    <>
      {(areTablesLoading || areProductsLoading) && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <Spinner color="warning" />
        </div>
      )}
      {isClient && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
              <Spinner color="warning" />
            </div>
          }
        >
          <div>
            <ToastContainer position="top-center" />
            <div className="grid place-items-center min-h-screen">
              <h1 className="font-bold text-2xl text-slate-100 py-3">
                Mesas Disponibles
              </h1>
              <Divider className="bg-slate-100 mb-4" />

              <div className="flex flex-col gap-3 ">
                {availableTables?.map((table) => (
                  <AvailableTable
                    key={table.id}
                    tableId={table.id}
                    tableSize={table.size}
                  />
                ))}
              </div>

              <Divider className="bg-slate-100 mt-4" />
              <h1 className="font-bold text-2xl text-slate-100 py-3">
                Mesas Ocupadas
              </h1>
              <Divider className="bg-slate-100 mb-4" />

              <div className="flex flex-col gap-4 mb-4">
                {occupiedTables?.map((table) => (
                  <OcuppiedTable
                    key={table.id}
                    tableId={table.id}
                    tableSize={table.size}
                  />
                ))}
              </div>
            </div>
          </div>
        </Suspense>
      )}
    </>
  );
};

export default WaiterDashboard;
