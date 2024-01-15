"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
  ChipProps,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  getKeyValue,
  Divider,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ICustomer } from "@/app/types/customer";
import { ClientsForm } from "../components/clientForm";
import { useCustomerStore } from "@/app/store/customerStore";
import { deleteCustomer } from "@/app/api/useCostumers";

const COLUMNS = [
  {
    key: "firstName",
    label: "Primer nombre",
  },
  {
    key: "secondName",
    label: "Segundo nombre",
  },
  {
    key: "firstLastName",
    label: "Primer apellido",
  },
  {
    key: "secondLastName",
    label: "Segundo apellido",
  },
  {
    key: "email",
    label: "Correo electrónico",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];
const ClientsView = () => {
  const {
    customers,
    loadCustomers,
    customersLoaded,
    setCustomersLoaded,
    setCustomers,
  } = useCustomerStore();
  const [isFetching, setIsFetching] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
    null
  );
  const [isClient, setIsClient] = useState(false);

  const resolveRowComponentByColumnKey = (item: ICustomer, columnKey: Key) => {
    switch (columnKey) {
      case "actions":
        return (
          <TableCell>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">...</Button>
              </DropdownTrigger>

              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="edit"
                  onPress={() => {
                    setSelectedCustomer(item);
                    onOpen();
                  }}
                >
                  Editar
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  color="danger"
                  onPress={() => {
                    setSelectedCustomer(item);
                    onOpenDelete();
                  }}
                >
                  Eliminar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </TableCell>
        );
      default:
        return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (!customersLoaded) {
        const loadingCustomers = async () => {
          setIsFetching(true);
          try {
            await loadCustomers();
            setCustomersLoaded(true);
          } catch (error) {
            toast.error("Error al cargar los clientes");
            console.log(error);
          } finally {
            setIsFetching(false);
          }
        };
        loadingCustomers();
      }
    }

    setIsClient(true);

    return () => {
      isMounted = false;
    };
  }, [customers, customersLoaded, loadCustomers, setCustomersLoaded]);

  return (
    <>
      {isClient && (
        <div>
          <Divider className="bg-white" />
          <h1 className="text-2xl font-semibold text-white text-center py-4">
            Gestionar Clientes
          </h1>
          <Divider className="bg-white mb-8" />

          <Button
            onPress={() => {
              setSelectedCustomer(null);
              onOpen();
            }}
            radius="sm"
            className="w-40 h-12 ml-6 border-2  bg-amber-500 "
          >
            Crear cliente
          </Button>

          <div className="m-6">
            <Table
              aria-label="Example table with dynamic content"
              className="max-h-[700px] overflow-y-auto"
            >
              <TableHeader columns={COLUMNS}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody
                emptyContent={"No existen datos sobre clientes"}
                isLoading={isFetching}
              >
                {customers! &&
                  customers.map((item) => (
                    <TableRow key={item.id}>
                      {(columnKey) =>
                        resolveRowComponentByColumnKey(item, columnKey) || <></>
                      }
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <ClientsForm
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            values={selectedCustomer as ICustomer}
          />

          <Modal
            isOpen={isOpenDelete}
            onOpenChange={onOpenChangeDelete}
            onClose={() => {
              onOpenChangeDelete();
            }}
            className="min-w-[900px]"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="text-2xl">
                    Eliminar cliente
                  </ModalHeader>

                  <ModalBody>
                    <p>
                      ¿Está seguro que desea eliminar el cliente{" "}
                      {selectedCustomer?.firstName}{" "}
                      {selectedCustomer?.firstLastName}?
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      onClick={() => {
                        onClose();
                      }}
                    >
                      Cancelar
                    </Button>
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
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ClientsView;
