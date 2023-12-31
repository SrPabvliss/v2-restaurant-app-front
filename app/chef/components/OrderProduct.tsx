"use client";

import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  ScrollShadow,
} from "@nextui-org/react";
import { Product } from "@/app/types/product";
import { useOrdersStore } from "@/app/store/orderStore";
import { toast } from "react-toastify";
import { Order, UnitOrderState } from "@/app/types/order";
import { useUserStore } from "@/app/store/userStore";

export const OrderProduct = ({
  order,
  product,
  quantity,
  status,
}: {
  order: Order;
  product: Product;
  quantity: number;
  status: string;
}) => {
  const { handleChangeStatusOrder } = useOrdersStore();
  const { user } = useUserStore();

  if (!user) {
    return <div></div>;
  }

  const changeStatusOrder = () => {
    const unitOrderId = order.unitOrders?.at(0)?.id;

    if (!unitOrderId) {
      toast.error("No hay productos en la orden", { autoClose: 1000 });
      return;
    }

    handleChangeStatusOrder(unitOrderId, UnitOrderState.READY);
    toast.success("Orden despachada", { autoClose: 1000 });
  };
  return (
    <Card
      key={product.id}
      className=" bg-background/95 dark:bg-default-100/50 min-w-60"
    >
      <CardBody className="px-6 min-w-52">
        <div className="flex justify-between flex-col">
          <div className="text-xl font-semibold text-center pb-5">
            {product.name}
            <p>{status}</p>
          </div>

          <div className="flex justify-center">
            <Image
              src={`/images/products/${product.id}.jpg`}
              alt="img del producto"
              className="w-auto h-32 rounded-full"
            />
          </div>

          <div className="text-center py-4 ">
            <span className="font-semibold">Cantidad:</span>
            {quantity}
          </div>

          <Button color="warning" variant="shadow" onClick={changeStatusOrder}>
            Despachar x1
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
