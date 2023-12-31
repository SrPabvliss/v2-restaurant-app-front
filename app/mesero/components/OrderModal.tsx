"use client";
import { useProductStore } from "@/app/store/productStore";
import { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useOrdersStore } from "@/app/store/orderStore";
import { toast } from "react-toastify";

export interface OrderModalProps {
  visitId: number;
  type: "enqueued" | "registered";
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderModal = ({
  visitId,
  type,
  openModal,
  setOpenModal,
}: OrderModalProps) => {
  const { getProductById } = useProductStore();
  const {
    getEnqueuedOrderByVisitId,
    getMasterOrderByVisitId,
    handleCleanToQueueOrdersByVisitId,
    handleCreateMasterOrder,
    loadOrders,
  } = useOrdersStore();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const enqueuedOrder = getEnqueuedOrderByVisitId(visitId);
  const masterOrders = getMasterOrderByVisitId(visitId);

  const createOrder = () => {
    if (enqueuedOrder) {
      handleCreateMasterOrder(enqueuedOrder);
      handleCleanToQueueOrdersByVisitId(visitId);
      setOpenModal(false);
      toast.success("Orden registrada", { autoClose: 1000 });
    } else {
      toast.error("No hay productos en la orden", { autoClose: 1000 });
    }
  };

  const cleanOrder = () => {
    handleCleanToQueueOrdersByVisitId(visitId);
    setOpenModal(false);
    toast.success("Orden cancelada", { autoClose: 1000 });
  };

  useEffect(() => {
    loadOrders();
    if (openModal) {
      onOpen();
    } else {
      onClose(); // Asegúrate de que tienes un método `onClose`.
    }
  }, [onClose, onOpen, loadOrders, openModal]);

  useEffect(() => {
    setOpenModal(isOpen);
  }, [onClose, setOpenModal, isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xs"
        placement="center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onOpen) => {
            if (type == "enqueued")
              return (
                <>
                  <ModalHeader>Orden en curso</ModalHeader>
                  <ModalBody>
                    {enqueuedOrder &&
                      enqueuedOrder.products.map((orderProduct) => {
                        const product = getProductById(orderProduct.productId);
                        return (
                          <div key={orderProduct.productId}>
                            {orderProduct.quantity} - {product?.name}
                          </div>
                        );
                      })}
                  </ModalBody>
                  <ModalFooter className="justify-between">
                    <Button color="danger" onClick={cleanOrder}>
                      Cancelar Orden
                    </Button>

                    <Button color="success" onClick={createOrder}>
                      Ordenar
                    </Button>
                  </ModalFooter>
                </>
              );

            if (type == "registered")
              return (
                <>
                  <ModalHeader>Ordenes registradas</ModalHeader>
                  <ModalBody>
                    {masterOrders &&
                      masterOrders?.map((masterOrder) => {
                        return (
                          <div key={masterOrder.id}>
                            <div className="text-xl font-semibold">
                              Orden #{masterOrder.id}
                            </div>
                            {masterOrder.orders?.map((order) => {
                              const product = order.product;
                              return (
                                <div key={order.id}>
                                  {order.quantity} - {product?.name}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onOpen}>Cerrar</Button>
                  </ModalFooter>
                </>
              );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderModal;
