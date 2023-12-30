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

const AddClientModal = ({ isOpen, onClose, onOpenChange  }: {  isOpen: boolean, onClose: () => void, onOpenChange: () => void  }) => {
    const customerForm = {
		name: "",
		secondName: "",
		lastName: "",
		secondLastName: "",
		email: "",
		phone: "",
		address: "",
	};
    
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
						<ModalHeader>Agrega un cliente</ModalHeader>
						<ModalBody>
							<div className="flex flex-col gap-4">
								<Input
									variant="bordered"
									label="Nombre"
									onChange={(e) => {
										customerForm.name = e.target.value;
									}}
								/>
								<Input
									variant="bordered"
									label="Segundo nombre"
									onChange={(e) => {
										customerForm.secondName = e.target.value;
									}}
								/>
								<Input
									variant="bordered"
									label="Apellido"
									onChange={(e) => {
										customerForm.lastName = e.target.value;
									}}
								/>
								<Input
									variant="bordered"
									label="Segundo apellido"
									onChange={(e) => {
										customerForm.secondLastName = e.target.value;
									}}
								/>
								<Input
									variant="bordered"
									label="Teléfono"
									onChange={(e) => {
										customerForm.phone = e.target.value;
									}}
								/>
								<Input
									variant="bordered"
									label="Correo electrónico"
									onChange={(e) => {
										customerForm.email = e.target.value;
									}}
								/>
								<Input
									variant="bordered"
									label="Dirección"
									onChange={(e) => {
										customerForm.address = e.target.value;
									}}
								/>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button
								color="primary"
								variant="shadow"
								onClick={() => {
									console.log(customerForm);
									// onClose();
								}}
							>
								Agregar cliente
							</Button>
							<Button color="danger" variant="light" onPress={onClose}>
								Close
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default AddClientModal;
