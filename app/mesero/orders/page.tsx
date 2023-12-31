"use client";

import { useOrdersStore } from "@/app/store/orderStore";
import { useTableStore } from "@/app/store/tableWsStore";
import { useUserStore } from "@/app/store/userStore";
import { UnitOrderState } from "@/app/types/order";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const { handleChangeStatusOrder, readyMasterOrders } = useOrdersStore();
  const { getTableIdByVisitId } = useTableStore();
  const { user } = useUserStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!user) {
    return <div></div>;
  }

  console.log(readyMasterOrders);

  return (
    <div>
      {isClient && (
        <div>
          <div>
            <div className="text-2xl text-slate-100 py-3">
              Ordenes para servir
            </div>
            <div className="flex flex-col gap-4">
              {readyMasterOrders?.map((masterOrder, index) => (
                <div
                  className="flex flex-row justify-between"
                  key={masterOrder.visit.id.toString() + index.toString()}
                >
                  <div className="text-slate-100">
                    Mesa {getTableIdByVisitId(masterOrder.visit.id)}
                  </div>
                  {masterOrder.orders?.map((order) => (
                    <div className="flex gap-4" key={order.id}>
                      <p>Orden # {order.id}</p>

                      {order.unitOrders?.map((unitOrder) => (
                        <div
                          className="text-slate-100"
                          key={unitOrder.id}
                          onClick={() =>
                            handleChangeStatusOrder(
                              unitOrder.id,
                              UnitOrderState.SERVED
                            )
                          }
                        >
                          {order.product.name} x{unitOrder.productState}
                        </div>
                      ))}
                    </div>
                  ))}
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

export default OrdersPage;
