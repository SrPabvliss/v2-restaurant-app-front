import React from "react";
import {
	Button,
	Card,
	CardBody,
	Divider,
	Image,
	ScrollShadow,
	useDisclosure,
} from "@nextui-org/react";

interface IProduct {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

const OrderProduct = ({ product }: {product : IProduct}) => {
	return (
		<Card
			key={product.id}
			className=" bg-background/95 dark:bg-default-100/50 min-w-60 "
		>
			<CardBody className="px-6 min-w-52">
				<div className="flex justify-between flex-col">
					<div className="text-xl font-semibold text-center pb-5">
						{product.name}
					</div>
					<div className="flex justify-center">
						<Image
							src={`/images/products/${product.id}.jpg`}
							alt="img del producto"
							className="w-auto h-32 rounded-full"
						/>
					</div>

					<div className="text-center py-4 ">
						<span className="font-semibold">Cantidad: </span>
						{product.quantity}
					</div>
					<div className="text-center">
						<p>
							<span className="font-semibold">Precio por unidad:</span> $
							{product.price}
						</p>
						<p>
							<span className="font-semibold">Precio total:</span> $
							{product.price * product.quantity}
						</p>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default OrderProduct;
