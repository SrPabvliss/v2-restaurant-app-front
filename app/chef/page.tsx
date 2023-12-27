"use client";

import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Chip,
	Image,
	ScrollShadow,
} from "@nextui-org/react";
import React from "react";
import { IGroupedOrders, Order, QuantityOrder } from "../types/order";
import { Content } from "next/font/google";

const orderTest: Order[] = [
	{
		id: 1,
		product: {
			id: 1,
			name: "Pizza",
			price: 100,
		},
		status: "pending",
		visit: {
			id: 1,
			tableId: 1,
		},
		img: "https://images.pexels.com/photos/1639564/pexels-photo-1639564.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
	},
	{
		id: 2,
		product: {
			id: 2,
			name: "Hamburguesa",
			price: 50,
		},
		status: "pending",
		visit: {
			id: 1,
			tableId: 1,
		},
	},
	{
		id: 3,
		product: {
			id: 3,
			name: "Papas",
			price: 20,
		},
		status: "pending",
		visit: {
			id: 1,
			tableId: 1,
		},
	},
	{
		id: 4,
		product: {
			id: 4,
			name: "Coca Cola",
			price: 30,
		},
		status: "preparing",
		visit: {
			id: 4,
			tableId: 1,
		},
	},
	{
		id: 5,
		product: {
			id: 4,
			name: "Coca Cola",
			price: 30,
		},
		status: "prepared",
		visit: {
			id: 2,
			tableId: 2,
		},
	},
	{
		id: 6,
		product: {
			id: 4,
			name: "Coca Cola",
			price: 30,
		},
		status: "pending",
		visit: {
			id: 5,
			tableId: 2,
		},
	},
	{
		id: 7,
		product: {
			id: 4,
			name: "Coca Cola",
			price: 30,
		},
		status: "pending",
		visit: {
			id: 3,
			tableId: 3,
		},
	},
	{
		id: 8,
		product: {
			id: 4,
			name: "Coca Cola",
			price: 30,
		},
		status: "prepared",
		visit: {
			id: 3,
			tableId: 3,
		},
	},
	{
		id: 9,
		product: {
			id: 1,
			name: "Pizza",
			price: 100,
		},
		status: "preparing",
		visit: {
			id: 1,
			tableId: 1,
		},
	},
];

const si = [{}];

const groupedOrders: IGroupedOrders = orderTest.reduce((acc, order) => {
	const visitKey = order.visit.id;
	const productKey = order.product.id;

	if (!acc[visitKey]) {
		acc[visitKey] = [];
	}

	const existingProduct = acc[visitKey].find(
		(p: any) => p.product.id === productKey
	);

	if (existingProduct) {
		(existingProduct as QuantityOrder).quantity += 1;
	} else {
		(acc[visitKey] as QuantityOrder[]).push({
			quantity: 1,
			...order,
		});
	}

	return acc;
}, {} as IGroupedOrders);

const setStatusChip = (status: string) => {
	if (status === "pending") {
		return "default";
	} else if (status === "preparing") {
		return "warning";
	} else {
		return "success";
	}
};

const ChefDahsboard: React.FC = () => {
	return (
		<div className="flex justify-center py-6">
			<div className="flex justify-center  flex-col w-8/12 gap-4 ">
				{Object.entries(groupedOrders).map(([visitId, groupedProducts]) => (
					<Card
						key={visitId}
						className="border-none bg-background/90 dark:bg-default-100/50"
					>
						<CardHeader className="bg-amber-500">
							<p className="text-xl font-semibold px-6">Orden #{visitId}</p>
						</CardHeader>
						
						<CardBody>
							<div className="flex gap-6">
								{groupedProducts.map((groupedProduct: QuantityOrder) => (
									<Card
										key={groupedProduct.product.id}
										className=" bg-background/95 dark:bg-default-100/50"
									>
										<CardHeader className="pb-0 flex justify-center">
											<Chip color={setStatusChip(groupedProduct.status)}>
												{groupedProduct.status}
											</Chip>
										</CardHeader>
										<CardBody className="px-6">
											<div className="flex justify-between flex-col">
												<div className="text-xl font-semibold text-center pb-5">
													{groupedProduct.product.name}
												</div>

												<Image
													src={groupedProduct.img}
													alt="img del producto"
													className="w-32 h-32 rounded-full"
												/>

												<div className="text-center py-4 ">
													<span className="font-semibold">Cantidad:</span>
													{groupedProduct.quantity}
												</div>

												<Button color="warning" variant="shadow">
													Despachar x1
												</Button>
											</div>
										</CardBody>
									</Card>
								))}
							</div>
						</CardBody>
					</Card>
				))}
			</div>
		</div>
	);
};

export default ChefDahsboard;
