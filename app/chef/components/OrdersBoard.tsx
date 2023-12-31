"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  ScrollShadow,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { OrderProduct } from "./OrderProduct";
import { useOrdersStore } from "../../store/orderStore";
import { IMasterOrder } from "@/app/types/order";
const OrdersBoard = () => {
  const {
    progressingMasterOrders,
    readyMasterOrders,
    loadOrders,
    areReadyOrdersLoading,
  } = useOrdersStore();

  return (
    <div className="flex w-11/12 gap-4 justify-between">
      <div className="flex flex-col w-9/12 gap-4  ">
        <p className="text-xl font-semibold px-6 text-white">
          Ordenes a preparar
        </p>
        <ScrollShadow
          className="flex flex-col gap-4 pr-3"
          orientation="vertical"
        >
          {progressingMasterOrders?.map((masterOrder, index) => (
            <div className="flex gap-4 w-full" key={index}>
              <Card className="border-none bg-background/90 dark:bg-default-100/50 w-full">
                <CardHeader className="bg-amber-500">
                  <p className="text-xl font-semibold px-6">
                    Orden #{`${masterOrder.id}`}
                  </p>
                </CardHeader>
                <CardBody className="flex ">
                  <ScrollShadow
                    className="flex gap-6 overflow-x-auto pb-4 px-4"
                    orientation="horizontal"
                  >
                    {masterOrder.orders?.map((order) => {
                      return (
                        <OrderProduct
                          key={order.id}
                          order={order}
                          product={order.product}
                          quantity={order.unitOrders?.length || 0}
                          status={index === 0 ? "Preparando" : "Espera"}
                        />
                      );
                    })}
                  </ScrollShadow>
                </CardBody>
              </Card>
            </div>
          ))}
        </ScrollShadow>
      </div>
      <div className="flex flex-col w-3/12 gap-4">
        <p className="text-xl font-semibold px-6 text-white">
          Platillos listos {readyMasterOrders?.length}
        </p>
        <ScrollShadow
          className="grid grid-cols-2 gap-4 pr-2"
          orientation="vertical"
        >
          {readyMasterOrders?.map((masterOrder, index) => {
            return (
              <div className="flex gap-4 h-fit" key={"r" + index}>
                <Card className="border-none bg-background/90 dark:bg-default-100/50 ">
                  <CardHeader className="bg-amber-500">
                    <strong>Orden # {masterOrder.id}</strong>
                  </CardHeader>
                  <CardBody className="flex flex-col gap-4">
                    <div className="max-h-80 overflow-y-auto py-2">
                      {masterOrder.orders?.map((order) => {
                        return (
                          <div
                            className="flex flex-col gap-2 justify-center items-center "
                            key={order.id}
                          >
                            <p>
                              {order.product.name} x{order.unitOrders?.length}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </ScrollShadow>
      </div>
    </div>
  );
};

export default OrdersBoard;
