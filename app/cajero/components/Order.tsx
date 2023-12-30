import { ChevronRightIcon } from "@heroicons/react/16/solid";
import {
	Card,
	Divider,
	CardBody,
	CardHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Order = ({order}: {order: any}) => {
	const router = useRouter();

	return (
		<Card
			className="border-none bg-background/90 dark:bg-default-100/50"
			key={order.id}
			isPressable
			onPress={() => {
				router.push(`/cajero/${order.id}`);
			}}
		>
			<CardHeader className="pt-4 pl-4 bg-amber-500 bg-opacity-80">
				<p className="font-bold text-xl">Orden #{order.id}</p>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className="flex">
					<div className="flex-1 flex flex-col p-4">
						<p className=" text-sm ">
							<span className="font-semibold">Total de la orden</span> $
							{order.total}
						</p>
						<p className="text-sm">
							<span className="font-semibold">Mesa no</span> {order.tableId}
						</p>
					</div>
					<div className="flex-1 flex justify-end items-center p-4">
						<ChevronRightIcon className="w-6 h-6 text-slate-400" />
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default Order;
