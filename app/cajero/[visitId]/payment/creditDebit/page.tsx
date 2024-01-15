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
import { useParams, useRouter } from "next/navigation";
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
import { on } from "events";
import { ClientsForm } from "@/app/administrador/components/clientForm";
import { fetchCustomers } from "@/app/api/useCostumers";
import { handlePayment } from "@/app/api/useInvoices";
import { PAYMENT_METHOD_ENUM } from "@/app/administrador/constants/payment-methods";
import { useUserStore } from "@/app/store/userStore";
import { toast } from "react-toastify";

const CreditDebitPayment = () => {
  const { visitId } = useParams();
  const [customerId, setCustomerId] = useState("");
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);
  const { getVisitById } = useVisitStore();
  const [total, setTotal] = useState(0);
  const [moneyGiven, setMoneyGiven] = useState(0);

  const router = useRouter();

  const { customers, loadCustomers } = useCustomerStore();
  const { user } = useUserStore();

  const { isOpen, onOpenChange } = useDisclosure();

  const { isOpen: isDeleteModalOpen, onOpenChange: onDeleteModalChange } =
    useDisclosure();

  const [masterOrders, setMasterOrders] = useState<
    IMasterOrder[] | undefined
  >();

  useEffect(() => {
    if (!customers) {
      const fetchCustomers = async () => {
        await loadCustomers();
      };
      fetchCustomers();
    }
    getVisitById(+visitId).then((visit) => {
      if (visit) {
        setMasterOrders(visit.masterOrders);
      }
    });
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitId]);

  const selectedCustomer = customers?.find(
    (c) => c.id.toString() === customerId
  );

  useMemo(() => {
    let total = 0;
    masterOrders?.forEach((masterOrder: IMasterOrder) => {
      masterOrder?.orders?.forEach((order: Order) => {
        total += order.quantity * order.product.price;
      });
    });

    setTotal(total);
  }, [masterOrders]);

  let fullName;

  const fetchPayment = async () => {
    await handlePayment({
      visitId: +visitId,
      customerId: customerId,
      employeeId: user?.id as string,
      paymentMethod: PAYMENT_METHOD_ENUM.CREDITO,
    }).then((response) => {
      if (response) {
        toast.success("Pago realizado con éxito");
        if (typeof window !== 'undefined') {
          // Tu código que usa `window` o `location` aquí
          window.location.href = response.url;
        }
      } else {
        toast.error("Error al realizar el pago");
      }
    });
  };

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
          <Autocomplete
            isRequired
            variant="bordered"
            label="Selecciona un cliente"
            className="max-w-xs"
            onSelectionChange={(e) => {
              setIsCustomerSelected(false);
              if (e) {
                setCustomerId(e.toString());
                setIsCustomerSelected(true);
              }
            }}
          >
            {customers ? (
              customers!.map(
                (customer) => (
                  (fullName = `${customer.firstName} ${customer.firstLastName} ${customer.secondName} ${customer.secondLastName}`),
                  (
                    <AutocompleteItem key={customer.id}>
                      {fullName}
                    </AutocompleteItem>
                  )
                )
              )
            ) : (
              <div></div>
            )}
          </Autocomplete>
          <Button color="secondary" variant="shadow" onClick={onOpenChange}>
            Agregar cliente
          </Button>
          <Button
            variant="shadow"
            onClick={onOpenChange}
            disabled={!isCustomerSelected}
          >
            Modificar cliente
          </Button>
          <Button
            variant="shadow"
            onClick={onDeleteModalChange}
            disabled={!isCustomerSelected}
          >
            Eliminar cliente
          </Button>
        </div>
        <h2 className="font-semibold text-xl py-4">Detalles de la orden: </h2>
        <div className="flex justify-center">
          <OrderSummary masterOrders={masterOrders} />
        </div>
        <div className="flex justify-center items-center gap-8 py-4">
          <div className="flex-1">
            <p className="font-semibold text-xl">Total de esta orden: </p>
          </div>
          <div className="flex-1">
            <p> {formatCurrency(total)}</p>
          </div>
          <div className="flex-1">
            <Button
              color="warning"
              variant="shadow"
              size="lg"
              onClick={fetchPayment}
            >
              Proceder al pago
            </Button>
          </div>
        </div>

        <ClientsForm
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          values={selectedCustomer}
        />

        <DeleteClientModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalChange}
          onOpenChange={onDeleteModalChange}
          selectedCustomer={selectedCustomer}
        />
      </Card>
    </div>
  );
};

export default CreditDebitPayment;
