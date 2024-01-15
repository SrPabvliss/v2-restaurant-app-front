import { IMasterOrder } from "@/app/types/order";
import { formatCurrency } from "@/app/utils/formaters";
import React from "react";

const OrderSummary = ({ masterOrders }: { masterOrders?: IMasterOrder[] }) => {
  if (!masterOrders) return null;

  return (
    <div className="flex flex-col gap-4 w-11/12 border border-slate-300 rounded-lg pb-2">
      <div className="flex justify-between items-center font-semibold text-center bg-amber-500 bg-opacity-85 rounded-t-lg p-4">
        <p className="flex-1">Producto</p>
        <p className="flex-1">Cantidad</p>
        <p className="flex-1">Precio Unitario</p>
        <p className="flex-1">Total por producto</p>
      </div>
      {masterOrders?.map((masterOrder) =>
        masterOrder.orders?.map((order) => (
          <div
            className="flex justify-between items-center text-center"
            key={order.id}
          >
            <p className="flex-1">{order.product.name}</p>
            <p className="flex-1">{order.quantity}</p>
            <p className="flex-1">{formatCurrency(order.product.price)}</p>
            <p className="flex-1">
              {formatCurrency(order.product.price * order.quantity)}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderSummary;
