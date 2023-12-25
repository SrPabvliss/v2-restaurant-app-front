"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useProductStore } from "../store/productStore";
import { useUserStore } from "../store/userStore";
import { useTableStore } from "../store/tableStore";
import { Divider } from "@nextui-org/react";
import AvailableTable from "./components/AvailableTable";
import OcuppiedTable from "./components/OcuppiedTable";

const WaiterDashboard: React.FC = () => {
	const { productsLoaded, loadProducts } = useProductStore();
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);
	const { user } = useUserStore();
	const {
		tables,
		loadTables,
		availableTables,
		occupiedTables,
	} = useTableStore();

	useEffect(() => {
		if (!tables) {
			loadTables();
		}
		if (!user) {
			router.push("/");
		}
		if (!productsLoaded) {
			loadProducts();
		}
		setIsClient(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		productsLoaded,
		loadProducts,
		tables,
		occupiedTables,
		availableTables,
		user,
	]);

	return (
		<>
			{isClient && (
				<div
					className="bg-repeat bg-center "
					style={{ backgroundImage: `url('/images/fondoLoginAct.jpg')` }}
				>
					<ToastContainer position="top-center" />
					<div className="grid place-items-center min-h-screen">
						<h1 className="font-bold text-2xl text-slate-100 py-3">
							Mesas Disponibles
						</h1>
						<Divider className="bg-slate-100 mb-4" />

						<div className="flex flex-col gap-3 ">
							{availableTables?.map((table) => (
								<AvailableTable
									key={table.id}
									tableId={table.id}
									tableSize={table.size}
								/>
							))}
						</div>

						<Divider className="bg-slate-100 mt-4" />
						<h1 className="font-bold text-2xl text-slate-100 py-3">
							Mesas Ocupadas
						</h1>
						<Divider className="bg-slate-100 mb-4" />

						<div className="flex flex-col gap-4">
							{occupiedTables?.map((table) => (
								<OcuppiedTable
									key={table.id}
									tableId={table.id}
									tableSize={table.size}
								/>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default WaiterDashboard;
