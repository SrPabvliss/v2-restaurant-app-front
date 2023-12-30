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

const DeleteClientModal = ({
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
	const handleDeleteCustomer = () => {
		console.log("Customer deleted:", customer?.id);
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
						<ModalHeader>Delete Customer</ModalHeader>
						<ModalBody>
							Are you sure you want to delete this customer? This action cannot
							be undone.
						</ModalBody>
						<ModalFooter>
							<Button color="danger" onClick={handleDeleteCustomer}>
								Delete
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
