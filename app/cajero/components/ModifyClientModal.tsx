import React from "react";
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
import { on } from "events";
import { ICustomer } from "@/app/types/customer";

export const ModifyClientModal = ({
  isOpen,
  onClose,
  onOpenChange,
  customer,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  customer: ICustomer | undefined;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      size="xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Modificar un cliente</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <Input
                  variant="bordered"
                  label="Nombre"
                  value={customer?.firstName}
                  onChange={(e) => {
                    customer!.firstName = e.target.value;
                  }}
                />
                <Input
                  variant="bordered"
                  label="Segundo nombre"
                  value={customer?.secondName}
                  onChange={(e) => {
                    customer!.secondName = e.target.value;
                  }}
                />
                <Input
                  variant="bordered"
                  label="Apellido"
                  value={customer?.firstLastName}
                  onChange={(e) => {
                    customer!.firstLastName = e.target.value;
                  }}
                />
                <Input
                  variant="bordered"
                  label="Segundo apellido"
                  value={customer?.secondLastName}
                  onChange={(e) => {
                    customer!.secondLastName = e.target.value;
                  }}
                />
                <Input
                  variant="bordered"
                  label="Teléfono"
                  value={customer?.phoneNumber}
                  onChange={(e) => {
                    customer!.phoneNumber = e.target.value;
                  }}
                />
                <Input
                  variant="bordered"
                  label="Correo electrónico"
                  value={customer?.email}
                  onChange={(e) => {
                    customer!.email = e.target.value;
                  }}
                />
                <Input
                  variant="bordered"
                  label="Dirección"
                  value={customer?.address}
                  onChange={(e) => {
                    customer!.address = e.target.value;
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="shadow"
                onClick={() => {
                  // Here you would handle updating the customer
                  onClose();
                }}
              >
                Actualizar cliente
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModifyClientModal;
