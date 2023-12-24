"use client";
import React, { useEffect } from "react";
import { emptyTable, fetchTables, takeTable } from "../(login)/api/useTables";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IProductCategory } from "../(login)/types/product";
import { fetchProducts } from "../(login)/api/useProducts";
import { useRouter } from "next/navigation";
import { useProductStore } from "../store/productStore";
import { useUserStore } from "../store/userStore";
import { useTableStore } from "../store/tableStore";

const WaiterDashboard: React.FC = () => {
	const [availableTables, setAvailableTables] = React.useState<ITable[]>([]);
	const [occupiedTables, setOccupiedTables] = React.useState<ITable[]>([]);
	const { productsLoaded, loadProducts } = useProductStore();
	const router = useRouter();
	const { logout, user } = useUserStore();
	const { tables, loadTables } = useTableStore();

	const filterTables = () => {
		if (tables) {
			const availableTables = tables.filter(
				(table) => table.availability === true
			);
			const occupiedTables = tables.filter(
				(table) => table.availability === false
			);
			setAvailableTables(availableTables);
			setOccupiedTables(occupiedTables);
			console.log(availableTables);
			console.log(occupiedTables);
		} else {
			loadTables();
		}
	};

	const handleTakeTable = async (tableId: number) => {
		try {
			const result = await takeTable(tableId);
			if (result) {
				toast.success("Mesa ocupada correctamente", {
					position: "bottom-center",
					autoClose: 1800,
				});
			}
		} catch (error) {
			console.error("Error al ocupar la mesa:", error);
			toast.error("Error al ocupar la mesa", {
				position: "bottom-center",
				autoClose: 1800,
			});
		}
	};

	const handleEmptyTable = async (tableId: number) => {
		try {
			const result = await emptyTable(tableId);
			if (result) {
				toast.success("Mesa desocupada correctamente", {
					position: "bottom-center",
					autoClose: 1800,
				});
			}
		} catch (error) {
			console.error("Error al desocupar la mesa:", error);
			toast.error("Error al desocupar la mesa", {
				position: "bottom-center",
				autoClose: 1800,
			});
		}
	};

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	useEffect(() => {
		if (!tables) {
			
			loadTables();
		} else {
		}

		if (!user) {
			router.push("/");
		}

		if (!productsLoaded) {
			loadProducts();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productsLoaded, loadProducts, availableTables, occupiedTables]);

	return (
		<>
			<ToastContainer position="top-center" />
			<div className="grid place-items-center h-screen">
				<div>Dashboard de Mesero</div>
				<button onClick={handleLogout}>Cerrar sesión</button>
				<h1 className="font-bold text-2xl">Mesas Disponibles</h1>
				{/* {tables?.map((table) => (
					<div key={table.id}>
						<div>Mesa {table.id}</div>
						<button onClick={() => handleTakeTable(table.id)}>
							Ocupar mesa
						</button>
					</div>
				))} */}

				<button onClick={filterTables}>filtrar</button>

				{availableTables?.map((table) => (
					<div key={table.id}>
						<div>Mesa {table.id}</div>
						<button onClick={() => handleTakeTable(table.id)}>
							Ocupar mesa
						</button>
					</div>
				))}
				<h1 className="font-bold text-2xl">Mesas Ocupadas</h1>
				{occupiedTables?.map((table) => (
					<div key={table.id}>
						<div>Mesa {table.id}</div>
						<button onClick={() => handleEmptyTable(table.id)}>
							Desocupar mesa
						</button>
						<button onClick={() => router.push(`mesero/mesa/${table.id}`)}>
							Orden
						</button>
					</div>
				))}
			</div>
		</>
	);
};

export default WaiterDashboard;
