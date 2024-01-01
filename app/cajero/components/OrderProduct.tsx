import React from "react";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Image,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import { Order } from "@/app/types/order";

const OrderProduct = ({ order }: { order: Order }) => {
  return (
    <Card
      key={order.id}
      className=" bg-background/95 dark:bg-default-100/50 min-w-60 "
    >
      <CardBody className="px-6 min-w-52">
        <div className="flex justify-between flex-col">
          <div className="text-xl font-semibold text-center pb-5">
            {order.product.name}
          </div>
          <div className="flex justify-center">
            <Image
              src={`/images/products/${order.product.id}.jpg`}
              alt="img del producto"
              className="w-auto h-32 rounded-full"
            />
          </div>

          <div className="text-center py-4 ">
            <span className="font-semibold">Cantidad: </span>
            {order.quantity}
          </div>
          <div className="text-center">
            <p>
              <span className="font-semibold">Precio por unidad:</span> $
              {order.product.price}
            </p>
            <p>
              <span className="font-semibold">Precio total:</span> $
              {order.product.price * order.quantity}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderProduct;
