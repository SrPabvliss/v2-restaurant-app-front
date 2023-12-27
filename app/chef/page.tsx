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
import { OrderProduct } from "./components/OrderProduct";

const orderTest: Order[] = [
	{
		id: 1,
		product: {
			id: 1,
			name: "Pizza",
			price: 100,
		},
		status: "prepared",
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
		status: "prepared",
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
		status: "prepared",
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
		status: "prepared",
		visit: {
			id: 1,
			tableId: 1,
		},
	},
];

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

const ChefDahsboard: React.FC = () => {
	return (
		<div className="flex justify-center py-6">
			<div className="flex justify-center flex-col w-9/12 gap-4 ">
				{Object.entries(groupedOrders).map(([visitId, groupedProducts]) => (
					<div className="flex gap-4 justify-center" key={visitId}>
						<Card
							key={visitId}
							className="border-none bg-background/90 dark:bg-default-100/50 w-7/12"
						>
							<CardHeader className="bg-amber-500">
								<p className="text-xl font-semibold px-6">Orden #{visitId}</p>
							</CardHeader>
							<CardBody className="flex ">
								<ScrollShadow
									className="flex gap-6 overflow-x-auto pb-4 px-4"
									orientation="horizontal"
								>
									{groupedProducts.map((groupedProduct: QuantityOrder) => (
										<OrderProduct
											key={groupedProduct.id}
											product={groupedProduct}
											status={groupedProduct.status}
										/>
									))}
								</ScrollShadow>
							</CardBody>
						</Card>
						<Card className="border-none bg-background/90 dark:bg-default-100/50 ">
							<CardHeader className="bg-amber-500">
								<p className="text-xl font-semibold px-6 ">
									{" "}
									Platillos listos{" "}
								</p>
							</CardHeader>
							<CardBody className="flex flex-col gap-4">
								<div className="max-h-80 overflow-y-auto py-2">
									{groupedProducts.map((groupedProduct: QuantityOrder) => (
										<div
											className="flex flex-col gap-2 justify-center items-center "
											key={groupedProduct.id}
										>
											{groupedProduct.status === "prepared" && (
												<p>
													{groupedProduct.product.name} x
													{groupedProduct.quantity}
												</p>
											)}
										</div>
									))}
								</div>
							</CardBody>
						</Card>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChefDahsboard;
