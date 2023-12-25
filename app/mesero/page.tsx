"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useProductStore } from "../store/productStore";
import { useUserStore } from "../store/userStore";
import { useTableStore } from "../store/tableStore";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Chip,
	Divider,
} from "@nextui-org/react";

const WaiterDashboard: React.FC = () => {
	const { productsLoaded, loadProducts } = useProductStore();
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);
	const { logout, user } = useUserStore();
	const {
		tables,
		loadTables,
		availableTables,
		occupiedTables,
		handleTakeTable,
		handleEmptyTable,
	} = useTableStore();

	const handleLogout = () => {
		logout();
		router.push("/");
	};

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
				<div className="bg-repeat bg-center " style={{ backgroundImage: `url('/images/fondoLoginAct.jpg')` }}>
					<ToastContainer position="top-center" />
					<div className="grid place-items-center ">

						<h1 className="font-bold text-2xl text-slate-100 py-3">Mesas Disponibles</h1>
						<Divider className="bg-slate-100 mb-4"/>
						<div className="flex flex-col gap-3 ">
							{availableTables?.map((table) => (
								<div key={table.id} className="px-5">
									<Card className="w-72 border-none bg-background/90 dark:bg-default-100/50 " isBlurred >
										<CardHeader>
											<div className="flex gap-2">
											<Chip color="success" variant="dot">
												Mesa No {table.id}
											</Chip> 
											<Chip variant="faded" >
												<div className="flex gap-2 items-center justify-center">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="icon icon-tabler icon-tabler-user"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														stroke-width="1.5"
														stroke="#9e9e9e"
														fill="none"
														stroke-linecap="round"
														stroke-linejoin="round"
													>
														<path stroke="none" d="M0 0h24v24H0z" fill="none" />
														<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
														<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
													</svg>
													<p>{table.size}</p>
												</div>
											</Chip>
											</div>
										</CardHeader>

										<Divider />
										<CardBody>
											<Button
												onClick={() => handleTakeTable(table.id)}
												color="warning"
												variant="shadow"
											>
												Ocupar mesa
											</Button>
										</CardBody>
									</Card>
								</div>
							))}
						</div>
						<Divider className="bg-slate-100 mt-4"/>
						<h1 className="font-bold text-2xl text-slate-100 py-3">Mesas Ocupadas</h1>
						<Divider className="bg-slate-100 mb-4"/>

						<div className="flex flex-col gap-4">
						{occupiedTables?.map((table) => (
							<>
							<div key={table.id} className="px-5">
									<Card className="w-72 border-none bg-background/90 dark:bg-default-100/50">
										<CardHeader>
											<div className="flex gap-2">
											<Chip color="danger" variant="dot" >
												Mesa No {table.id}
											</Chip> 
											<Chip variant="faded">
												<div className="flex gap-2 items-center justify-center">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="icon icon-tabler icon-tabler-user"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														stroke-width="1.5"
														stroke="#9e9e9e"
														fill="none"
														stroke-linecap="round"
														stroke-linejoin="round"
													>
														<path stroke="none" d="M0 0h24v24H0z" fill="none" />
														<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
														<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
													</svg>
													<p>{table.size}</p>
												</div>
											</Chip>
											</div>
										</CardHeader>

										<Divider />
										<CardBody>
											<div className="flex gap-2">
											<Button
												onClick={() => handleEmptyTable(table.id)}
												color="warning"
												variant="shadow"
												className="flex-1"
											>
												Desocupar mesa
											</Button>
											<Button
												onClick={() => router.push(`mesero/mesa/${table.id}`)}
												color="warning"
												variant="shadow"
												className="flex-1"
											>
												Orden
											</Button>
											</div>

										</CardBody>
									</Card>
								</div>
							</>
						))}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default WaiterDashboard;
