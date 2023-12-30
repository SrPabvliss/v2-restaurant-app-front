"use client";
import Product from "@/app/mesero/components/Product";
import { useOrdersStore } from "@/app/store/orderStore";
import { useProductStore } from "@/app/store/productStore";
import { useTableStore } from "@/app/store/tableWsStore";
import { OrderState } from "@/app/types/order";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { Button, Divider, Spinner } from "@nextui-org/react";
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
  const categoryProducts = categoryDetails?.Products;

  const { enqueueOrder, toQueueOrders } = useOrdersStore();
  const { visitTables } = useTableStore();

  const visitId = visitTables?.find(
    (visitTable) => visitTable.tableId === +tableId
  )?.visitId;

  const prevOrder = toQueueOrders
    ?.find((order) => order.visitId === visitId)
    ?.products?.map((product) => {
      console.log("product", product);
      return {
        [product.productId]: product.quantity,
      };
    })
    .reduce((prev, curr) => ({ ...prev, ...curr }), {});

  console.log(
    "prevOrder",
    toQueueOrders
      ?.find((order) => order.visitId == visitId)
      ?.products?.map((product) => {
        console.log("product", product);
        return {
          [product.productId]: product.quantity,
        };
      })
      .reduce((prev, curr) => ({ ...prev, ...curr }), {}),
    { visitTables },
    { prevOrder }
  );
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

          <div className="flex justify-center">
            <div className="flex flex-col gap-4 mb-4">
              {categoryProducts?.map((product) => (
                <Product
                  key={product.id}
                  productId={product.id}
                  productName={product.name}
                  productPrice={product.price}
                  addToOrder={addToOrder}
                  removeFromOrder={removeFromOrder}
                  order={order}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductByCategory;
