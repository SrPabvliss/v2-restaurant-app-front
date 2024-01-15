"use client";

import { useOrdersStore } from "@/app/store/orderStore";
import { useTableStore } from "@/app/store/tableWsStore";
import { useUserStore } from "@/app/store/userStore";
import { UnitOrderState } from "@/app/types/order";
import { formatCurrency } from "@/app/utils/formaters";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const {
    handleChangeStatusOrder,
    readyMasterOrders,
    loadOrders,
    getReadyOrderById,
  } = useOrdersStore();
  const { getTableIdByVisitId } = useTableStore();
  const { user } = useUserStore();

  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (typeof window === 'undefined') {
    return <div></div>
  }

  if (!user) {
    router.push("/");
  }

  const handleServeOrder = (orderId: number) => {
    const order = getReadyOrderById(orderId);
    if (!order) {
      return;
    }

    const unitOrderId = order.unitOrders?.[0].id;
    if (!unitOrderId) {
      return;
    }
    handleChangeStatusOrder(unitOrderId, UnitOrderState.SERVED);

    toast.success("Orden servida", {
      position: "bottom-right",
      autoClose: 300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  return (
    <div className="p-4 w-full">
      {isClient && (
        <div className="w-full px-4">
          <div>
            <div className="text-2xl text-slate-900 font-semibold py-3 bg-amber-500 rounded-md p-2 m-2">
              Ordenes para servir
            </div>
            <div className="flex flex-col gap-4">
              {readyMasterOrders?.map((masterOrder, index) => (
                <div
                  className="flex flex-row justify-center w-full"
                  key={masterOrder.visit.id.toString() + index.toString()}
                >
                  <Card className="w-10/12">
                    <CardHeader>
                      <div className="flex flex-row justify-between">
                        <div className="text-xl font-semibold px-6">
                          Orden #{`${masterOrder.id}`}
                        </div>
                        <div className="text-xl font-semibold px-6">
                          Mesa #{`${getTableIdByVisitId(masterOrder.visit.id)}`}
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <div className="flex flex-col gap-2">
                        {masterOrder.orders?.map((order) => {
                          return (
                            <div
                              className="flex flex-row justify-between"
                              key={order.id}
                            >
                              <div className="flex flex-row gap-4 justify-between w-full">
                                <div className="text-xl font-semibold px-6">
                                  {order.unitOrders?.length}
                                </div>
                                <Button
                                  color="success"
                                  onClick={() => handleServeOrder(order.id)}
                                >
                                  {order.product.name}
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                        <div className="flex flex-row justify-between">
                          <div className="text-xl font-semibold px-6">
                            Total
                          </div>
                          <div className="text-xl font-semibold px-6">
                            {formatCurrency(
                              masterOrder.orders?.reduce((acc, order) => {
                                return (
                                  acc +
                                  order.product.price *
                                    (order.unitOrders?.length || 0)
                                );
                              }, 0) as number
                            )}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Page;
