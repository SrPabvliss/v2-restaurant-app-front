"use client";
import { useParams, useRouter } from "next/navigation";
import { orders } from "../temp/order";
import {
	Button,
	Card,
	CardBody,
	Divider,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ScrollShadow,
	useDisclosure,
} from "@nextui-org/react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import OrderProduct from "../components/OrderProduct";
import { BanknotesIcon, CreditCardIcon } from "@heroicons/react/16/solid";
import { SelectPaymentModal } from "../components/SelectPaymentModal";

const OrderView = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { orderId } = useParams();
	const router = useRouter();

	const order = orders.find((order) => order.id.toString() === orderId);

	const total = order?.products.reduce((acc, product) => {
		return acc + product.price * product.quantity;
	}, 0);

	return (
		<>
			<div className="flex gap-4 items-center justify-evenly w-3/4">
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
				<h1 className="font-bold text-2xl text-slate-100 py-3">
					Detalles de la orden
				</h1>
			</div>
			<Divider className="bg-slate-100 mb-4" />
			<div className="text-slate-200 flex flex-col justify-center items-center gap-4 ">
				<ScrollShadow className="grid grid-cols-3 gap-4 w-5/12 max-h-unit-9xl overflow-y-auto py-3">
					{order?.products.map((product) => (
						<OrderProduct product={product} key={product.id} />
					))}
				</ScrollShadow>
				<Card className=" py-4 w-5/12 bg-background/95 dark:bg-default-100/50">
					<div className="flex justify-center items-center gap-8">
						<p className="font-semibold text-xl">Tota de esta orden: </p>
						<p> ${total}</p>
					</div>
					<CardBody className="flex justify-center items-center ">
						<Button color="warning" variant="shadow" onClick={onOpenChange}>
							Seleccionar método de pago
						</Button>
					</CardBody>
				</Card>
			</div>
			<SelectPaymentModal
			isOpen={isOpen}
			onClose={onOpenChange}
			orderId={orderId}
			onOpenChange={onOpenChange}
			/>
		</>
	);
};

export default OrderView;
