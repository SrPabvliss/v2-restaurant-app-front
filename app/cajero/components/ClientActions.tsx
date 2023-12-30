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
import { customers } from "../temp/customer";

const ClientActions = ({
	setIsCustomerSelected,
	setCustomerId,
	onAddModalChange,
	isCustomerSelected,
	onEditModalChange,
	onDeleteModalChange,
}: {
    setIsCustomerSelected: (value: boolean) => void;
    setCustomerId: (value: string) => void;
    onAddModalChange: () => void;
    isCustomerSelected: boolean;
    onEditModalChange: () => void;
    onDeleteModalChange: () => void;
}) => {
	let fullName;

	return (
		<>
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
				{customers.map(
					(customer) => (
						(fullName = `${customer.name} ${customer.lastName} ${customer.secondName} ${customer.secondLastName}`),
						(<AutocompleteItem key={customer.id}>{fullName}</AutocompleteItem>)
					)
				)}
			</Autocomplete>
			<Button variant="shadow" color="warning" onClick={onAddModalChange}>
				Agregar cliente
			</Button>
			<Button
				variant="shadow"
				color="primary"
				isDisabled={!isCustomerSelected}
				onClick={onEditModalChange}
			>
				Modificar cliente
			</Button>
			<Button
				variant="shadow"
				color="danger"
				isDisabled={!isCustomerSelected}
				onClick={onDeleteModalChange}
			>
				Eliminar cliente
			</Button>
		</>
	);
};

export default ClientActions;
