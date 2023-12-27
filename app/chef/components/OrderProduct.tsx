import { QuantityOrder } from "@/app/types/order";
import React from "react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Chip,
	Image,
	ScrollShadow,
} from "@nextui-org/react";

export const OrderProduct = ({ product, status }: { product: QuantityOrder , status: string }) => {

	return (
		<Card
			key={product.id}
			className=" bg-background/95 dark:bg-default-100/50 min-w-60"
		>
			
			<CardBody className="px-6 min-w-52">
				<div className="flex justify-between flex-col">
					<div className="text-xl font-semibold text-center pb-5">
						{product.product.name}
					</div>
					<div className="flex justify-center">
						<Image
							src={`/images/products/${product.id}.jpg`}
							alt="img del producto"
							className="w-auto h-32 rounded-full"
						/>
					</div>

					<div className="text-center py-4 ">
						<span className="font-semibold">Cantidad:</span>
						{product.quantity}
					</div>

					<Button color="warning" variant="shadow" >
						Despachar x1
					</Button>
				</div>
			</CardBody>
		</Card>
	);
};
