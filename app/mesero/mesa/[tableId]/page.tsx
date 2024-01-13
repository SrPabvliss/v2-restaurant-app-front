"use client";
import { useParams } from "next/navigation";
import { useProductStore } from "@/app/store/productStore";
import { useEffect, useState } from "react";
import { Button, Divider } from "@nextui-org/react";
import ProductCategory from "../../components/ProductCategory";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { useTableStore } from "@/app/store/tableWsStore";
import { useOrdersStore } from "@/app/store/orderStore";
import OrderModal from "../../components/OrderModal";

const OrderingTable = () => {
  const { tableId } = useParams();
  const { productCategories } = useProductStore();
  const { getVisitIdByTableId } = useTableStore();
  const { getEnqueuedOrderByVisitId, getMasterOrderByVisitId, loadOrders } =
    useOrdersStore();
  const [isClient, setIsClient] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [openQueuedOrderModal, setOpenQueuedOrderModal] = useState(false);

  const visitId = getVisitIdByTableId(+tableId);
  const enqueuedOrder = visitId && getEnqueuedOrderByVisitId(visitId);
  const masterOrder = visitId && getMasterOrderByVisitId(visitId);

  useEffect(() => {
    loadOrders();
    setIsClient(true);
  }, [loadOrders]);

  return (
    <>
      <div className="flex gap-4 items-center">
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
        <div className="text-2xl text-slate-100 py-3">
          Orden para la mesa {tableId}
        </div>
      </div>
      <Divider className="bg-slate-100 mb-4" />
      {isClient && (
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="flex flex-col gap-4">
            {productCategories &&
              productCategories.map((category) => (
                <ProductCategory
                  key={category.id}
                  categoryId={category.id}
                  categoryName={category.name}
                  productsLength={category.products.length}
                />
              ))}
          </div>
          <div className="flex py-4 space-x-3">
            {enqueuedOrder && (
              <>
                <Button
                  color="warning"
                  onClick={() => setOpenQueuedOrderModal(true)}
                >
                  Ver orden en curso
                </Button>
                <OrderModal
                  type="enqueued"
                  visitId={+visitId}
                  openModal={openQueuedOrderModal}
                  setOpenModal={setOpenQueuedOrderModal}
                />
              </>
            )}
            {masterOrder && (
              <>
                <Button onClick={() => setOpenOrderModal(true)}>
                  Ver ordenes registradas
                </Button>
                <OrderModal
                  type="registered"
                  visitId={+visitId}
                  openModal={openOrderModal}
                  setOpenModal={setOpenOrderModal}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderingTable;
