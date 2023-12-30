"use client";
import { Divider } from "@nextui-org/react";
import React from "react";
import { ToastContainer } from "react-toastify";
import { orders } from "./temp/order";
import Order from "./components/Order";

const CashierDahsboard: React.FC = () => {
	return (
		<>
			<ToastContainer position="top-center" />
			<div className="flex flex-col justify-center items-center">
				<h1 className="font-bold text-2xl text-slate-100 py-4">
					Ordenenes completadas
				</h1>
				<Divider className="bg-slate-100 mb-4" />

				<div className="grid grid-cols-3 gap-4 w-7/12">
					{orders.map((order) => (
						<Order order={order} key={order.id} />
					))}
				</div>
			</div>
		</>
	);
};

export default CashierDahsboard;
