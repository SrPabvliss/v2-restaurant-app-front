"use client";
import React, { useState } from "react";
import { customers } from "../../../temp/customer";
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
import { orders } from "@/app/cajero/temp/order";
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

const CashPayment = () => {
	const { orderId } = useParams();
	const [customerId, setCustomerId] = useState("");
	const [isCustomerSelected, setIsCustomerSelected] = useState(false);
	const { isOpen: isAddModalOpen, onOpenChange: onAddModalChange } =
		useDisclosure();
	const { isOpen: isEditModalOpen, onOpenChange: onEditModalChange } =
		useDisclosure();
	const { isOpen: isDeleteModalOpen, onOpenChange: onDeleteModalChange } =
		useDisclosure();

	const order = orders.find((order) => order.id.toString() === orderId);

	const total = order?.products.reduce((acc, product) => {
		return acc + product.price * product.quantity;
	}, 0);

	const selectedCustomer = customers.find(
		(c) => c.id.toString() === customerId
	);

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
					<OrderSummary order={order} />
				</div>
				<div className="flex justify-center items-center gap-8 py-4">
					<p className="font-semibold text-xl">Total de esta orden: </p>
					<p> ${total}</p>
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
