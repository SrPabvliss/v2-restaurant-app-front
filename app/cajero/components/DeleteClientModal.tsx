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
import { ICustomer } from "@/app/types/customer";
import { deleteCustomer } from "@/app/api/useCostumers";
import { useCustomerStore } from "@/app/store/customerStore";
import { toast } from "react-toastify";

const DeleteClientModal = ({
  isOpen,
  onClose,
  onOpenChange,
  selectedCustomer,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  selectedCustomer: ICustomer | undefined;
}) => {
  const handleDeleteCustomer = () => {
    console.log("Customer deleted:", selectedCustomer?.id);
  };

  const { setCustomers, customers } = useCustomerStore();

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
            <ModalHeader>Delete Customer</ModalHeader>
            <ModalBody>
              Are you sure you want to delete this customer? This action cannot
              be undone.
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={async () => {
                  const result = await deleteCustomer(
                    selectedCustomer?.id.toString() as string
                  );
                  if (result) {
                    setCustomers(
                      customers?.filter(
                        (customer) => customer.id !== selectedCustomer?.id
                      ) as ICustomer[]
                    );
                    toast.success("Cliente eliminado exitosamente");
                    onClose();
                  } else {
                    toast.error("Error al eliminar el cliente", {
                      closeButton: false,
                    });
                  }
                  onClose();
                }}
              >
                Eliminar
              </Button>
              <Button
                onClick={() => {
                  onClose();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteClientModal;
