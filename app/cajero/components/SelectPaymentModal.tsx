import { BanknotesIcon, CreditCardIcon } from "@heroicons/react/20/solid";
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
import { useRouter } from "next/navigation";

export const SelectPaymentModal = ({ isOpen, onClose, onOpenChange , orderId }: { orderId: string | string[], isOpen: boolean, onClose: () => void, onOpenChange: () => void  }) => {
	const router = useRouter();
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
						<ModalHeader>Selecciona un método de pago</ModalHeader>
						<ModalBody>
							<div className="flex gap-4">
								<Card
									isPressable
									className="flex-1 p-4 flex items-center"
									onPress={() =>
										router.push(`./${orderId}/payment/creditDebit`)
									}
								>
									<div className="flex flex-col justify-center items-center gap-4">
										<p>Tarjeta de crédito/débito</p>
										<CreditCardIcon className="h-12 w-12" />
									</div>
								</Card>
								<Card
									isPressable
									className="flex-1 p-4 flex items-center"
									onPress={() => router.push(`./${orderId}/payment/cash`)}
								>
									<div className="flex flex-col items-center gap-4">
										<p>Pago en efectivo</p>
										<BanknotesIcon className="h-12 w-12" />
									</div>
								</Card>
							</div>
						</ModalBody>
						<ModalFooter>
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
