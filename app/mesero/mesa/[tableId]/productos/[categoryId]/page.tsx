"use client";
import Product from "@/app/mesero/components/Product";
import { useOrdersStore } from "@/app/store/orderStore";
import { useProductStore } from "@/app/store/productStore";
import { useTableStore } from "@/app/store/tableWsStore";
import { OrderState } from "@/app/types/order";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { Button, Divider, ScrollShadow, Spinner } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductByCategory = () => {
  const { categoryId, tableId } = useParams();
  const {
    productCategories,
    productsLoaded,
    loadProducts,
    areProductsLoading,
  } = useProductStore();
  const [isClient, setIsClient] = useState(false);

  const categoryDetails = productCategories?.find(
    (category) => category.id.toString() === categoryId
  );

  const categoryName = categoryDetails?.name; // Obtendrás el nombre de la categoría aquí
  const categoryProducts = categoryDetails?.products;

  const { enqueueOrder, toQueueOrders } = useOrdersStore();
  const { getVisitIdByTableId } = useTableStore();

  const visitId = getVisitIdByTableId(+tableId);

  const prevOrder = toQueueOrders
    ?.find((order) => order.visitId === visitId)
    ?.products?.map((product) => {
      return {
        [product.productId]: product.quantity,
      };
    })
    .reduce((prev, curr) => ({ ...prev, ...curr }), {});

  const [order, setOrder] = useState<OrderState>(prevOrder ? prevOrder : {});

  const addToOrder = (productId: number) => {
    setOrder((prevOrder: OrderState) => ({
      ...prevOrder,
      [productId]: (prevOrder[productId] || 0) + 1,
    }));
  };

  const removeFromOrder = (productId: number) => {
    setOrder((prevOrder: OrderState) => ({
      ...prevOrder,
      [productId]: Math.max((prevOrder[productId] || 0) - 1, 0),
    }));
  };

  useEffect(() => {
    setIsClient(true);
    if (!productsLoaded) {
      loadProducts();
    }
  }, [loadProducts, productsLoaded]);

  useEffect(() => {
    if (visitId && Object.keys(order).length > 0) {
      console.log("visitId", visitId);
      enqueueOrder(visitId, order);
    }
  }, [order, enqueueOrder, visitId]);

  return (
    <>
      {areProductsLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <Spinner color="warning" />
        </div>
      )}
      {isClient && (
        <>
          <div className="flex gap-4 items-center ">
            <Button
              isIconOnly
              size="sm"
              className="my-4 ml-4 w-2 px-0"
              onClick={() => {
                window.history.back();
              }}
            >
              <ChevronLeftIcon />
            </Button>
            <div className="text-2xl text-slate-100 py-3">{categoryName}</div>
          </div>
          <Divider className="bg-slate-100 mb-4" />

          <div className="flex justify-center max-h-screen">
            <ScrollShadow
              className="flex flex-col gap-4 mb-4 "
              orientation="vertical"
            >
              {categoryProducts?.map((product) => (
                <div className="h-fit" key={product.id}>
                  <Product
                    key={product.id}
                    productId={product.id}
                    productName={product.name}
                    productPrice={product.price.toString()}
                    addToOrder={addToOrder}
                    removeFromOrder={removeFromOrder}
                    order={order}
                  />
                </div>
              ))}
            </ScrollShadow>
          </div>
        </>
      )}
    </>
  );
};

export default ProductByCategory;
