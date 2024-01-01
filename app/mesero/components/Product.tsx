import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";

const Product = ({
  productName,
  productPrice,
  productId,
  addToOrder,
  removeFromOrder,
  order,
}: {
  productName: string;
  productPrice: string;
  productId: number;
  addToOrder: (productId: number) => void;
  removeFromOrder: (productId: number) => void;
  order: any;
}) => {
  return (
    <Card className="w-72 border-none bg-background/90 dark:bg-default-100/50">
      <CardHeader className="bg-amber-500 bg-opacity-80">
        <div className="flex gap-3 items-center">
          <p>{productName}</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex justify-around items-center">
          <p className="text-sm font-light italic">
            <span className="font-medium ">Precio: </span>$ {productPrice}
          </p>
          <div className="flex gap-2 items-center border-1 border-slate-300 rounded-xl">
            <Button
              variant="shadow"
              isIconOnly
              onClick={() => removeFromOrder(productId)}
            >
              <MinusIcon className="w-3" />
            </Button>
            <div className="px-3">{order[productId] || 0}</div>
            <Button
              variant="shadow"
              isIconOnly
              onClick={() => addToOrder(productId)}
            >
              <PlusIcon className="w-3" />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Product;
