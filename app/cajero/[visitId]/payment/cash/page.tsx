"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import { ICustomer } from "@/app/types/customer";
import {
  BanknotesIcon,
  ChevronLeftIcon,
  CreditCardIcon,
} from "@heroicons/react/20/solid";
import AddClientModal from "@/app/cajero/components/AddClientModal";
import ModifyClientModal from "@/app/cajero/components/ModifyClientModal";
import DeleteClientModal from "@/app/cajero/components/DeleteClientModal";
import OrderSummary from "../../../components/orderSummary";
import ClientActions from "@/app/cajero/components/ClientActions";
import { IMasterOrder, Order } from "@/app/types/order";
import { useVisitStore } from "@/app/store/visitStore";
import { useCustomerStore } from "@/app/store/customerStore";
import { formatCurrency } from "@/app/utils/formaters";

const CashPayment = () => {
  const { visitId } = useParams();
  const [customerId, setCustomerId] = useState("");
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);
  const { getVisitById } = useVisitStore();
  const [total, setTotal] = useState(0);

  const { customers } = useCustomerStore();

  const { isOpen: isAddModalOpen, onOpenChange: onAddModalChange } =
    useDisclosure();
  const { isOpen: isEditModalOpen, onOpenChange: onEditModalChange } =
    useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpenChange: onDeleteModalChange } =
    useDisclosure();

  const [masterOrders, setMasterOrders] = useState<
    IMasterOrder[] | undefined
  >();

  useEffect(() => {
    getVisitById(+visitId).then((visit) => {
      if (visit) {
        setMasterOrders(visit.masterOrders);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitId]);
  const selectedCustomer = customers?.find(
    (c) => c.id.toString() === customerId
  );

  useMemo(() => {
    let total = 0;
    console.log(masterOrders);
    masterOrders?.forEach((masterOrder: IMasterOrder) => {
      masterOrder?.orders?.forEach((order: Order) => {
        total += order.quantity * order.product.price;
      });
    });

    setTotal(total);
  }, [masterOrders]);

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <Card className="min-h-unit-6xl bg-background/95 dark:bg-default-100/50 w-7/12 p-6">
        <div className="flex items-center gap-6">
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
          <h1 className="font-bold text-2xl py-3 text-center">
            Información de pago
          </h1>
        </div>
        <h2 className="font-semibold text-xl py-4">Cliente: </h2>
        <div className="flex items-center gap-4">
          <ClientActions
            setIsCustomerSelected={setIsCustomerSelected}
            setCustomerId={setCustomerId}
            onAddModalChange={onAddModalChange}
            isCustomerSelected={isCustomerSelected}
            onEditModalChange={onEditModalChange}
            onDeleteModalChange={onDeleteModalChange}
          />
        </div>
        <h2 className="font-semibold text-xl py-4">Detalles de la orden: </h2>
        <div className="flex justify-center">
          <OrderSummary masterOrders={masterOrders} />
        </div>
        <div className="flex justify-center items-center gap-8 py-4">
          <p className="font-semibold text-xl">Total de esta orden: </p>
          <p> {formatCurrency(total)}</p>
          <Button color="warning" variant="shadow" size="lg">
            Marcar como pagado
          </Button>
        </div>
        <AddClientModal
          isOpen={isAddModalOpen}
          onClose={onAddModalChange}
          onOpenChange={onAddModalChange}
        />

        <ModifyClientModal
          isOpen={isEditModalOpen}
          onClose={onEditModalChange}
          onOpenChange={onEditModalChange}
          customer={selectedCustomer}
        />

        <DeleteClientModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalChange}
          onOpenChange={onDeleteModalChange}
          customer={selectedCustomer}
        />
      </Card>
    </div>
  );
};

export default CashPayment;
