"use client";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { SelectPaymentModal } from "../components/SelectPaymentModal";
import { useEffect, useMemo, useState } from "react";
import { IMasterOrder, Order } from "@/app/types/order";
import { useVisitStore } from "@/app/store/visitStore";
import { formatCurrency } from "@/app/utils/formaters";
import OrderSummary from "../components/orderSummary";

const OrderView = () => {
  const { isOpen, onOpenChange } = useDisclosure();
  const { visitId } = useParams();

  const [isClient, setIsClient] = useState(false);

  const { getVisitById } = useVisitStore();
  const [total, setTotal] = useState(0);
  const [masterOrders, setMasterOrders] = useState<IMasterOrder[] | undefined>(
    []
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    getVisitById(+visitId).then((visit) => {
      if (visit) {
        setMasterOrders(visit.masterOrders);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    let total = 0;

    masterOrders?.forEach((masterOrder: IMasterOrder) => {
      masterOrder?.orders?.forEach((order: Order) => {
        total += order.quantity * order.product.price;
      });
    });

    setTotal(total);
  }, [masterOrders]);

  return (
    <div>
      {isClient && (
        <div>
          <div className="flex gap-4 items-center justify-evenly w-3/4">
            <Button
              isIconOnly
              size="sm"
              className="my-4 mr- w-2 px-0 "
              onClick={() => {
                window.history.back();
              }}
            >
              <ChevronLeftIcon />
            </Button>
            <h1 className="font-bold text-2xl text-slate-100 py-3">
              Detalles de la orden
            </h1>
          </div>
          <Divider className="bg-slate-100 mb-4" />
          <div className="text-slate-200 flex flex-col justify-center items-center gap-4 ">
            <ScrollShadow className="flex justify-center w-7/12 max-h-unit-9xl overflow-y-auto py-3">
              <OrderSummary masterOrders={masterOrders} />
            </ScrollShadow>
            <Card className=" py-4 w-5/12 bg-background/95 dark:bg-default-100/50">
              <div className="flex justify-center items-center gap-8">
                <p className="font-semibold text-xl">Tota de esta orden: </p>
                <p> {formatCurrency(total)}</p>
              </div>
              <CardBody className="flex justify-center items-center ">
                <Button color="warning" variant="shadow" onClick={onOpenChange}>
                  Seleccionar método de pago
                </Button>
              </CardBody>
            </Card>
          </div>
          <SelectPaymentModal
            isOpen={isOpen}
            onClose={onOpenChange}
            orderId={visitId}
            onOpenChange={onOpenChange}
          />
        </div>
      )}
    </div>
  );
};

export default OrderView;
