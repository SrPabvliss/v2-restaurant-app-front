"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	useDisclosure,
	Chip,
	ChipProps,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	getKeyValue,
} from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IProduct, products } from "../temp/products";
import { ClientsForm } from "../components/clientForm";

const statusColorMap: Record<string, ChipProps["color"]> = {
	active: "success",
	paused: "danger",
};
const COLUMNS = [
	{
		key: "name",
		label: "Nombre",
	},
	{
		key: "price",
		label: "Precio",
	},
	{
		key: "availability",
		label: "Disponible",
	},
	{
		key: "actions",
		label: "Acciones",
	},
];
const InvoiceView = () => {
	const router = useRouter();
	const [processUpdate, setProcessUpdate] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedClient, setSelectedClient] = useState<IProduct | null>(null);

	const resolveRowComponentByColumnKey = (item: IProduct, columnKey: Key) => {
		switch (columnKey) {
			case "availability":
				return (
					<TableCell>
						{
							<Chip
								className="capitalize"
								color={statusColorMap[item.availability ? "active" : "paused"]}
								size="sm"
								variant="flat"
							>
								{item.availability ? "Si" : "No"}
							</Chip>
						}
					</TableCell>
				);
			case "actions":
				return (
					<TableCell>
						<Dropdown>
							<DropdownTrigger>
								<Button variant="light">...</Button>
							</DropdownTrigger>

							<DropdownMenu aria-label="Static Actions">
								{/* <DropdownItem
									key="edit"
									onPress={() => {
										setSelectedClient(item);
										onOpen();
									}}
								>
									Editar
								</DropdownItem> */}
								<DropdownItem
									key={item.availability ? "desactivate" : "activate"}
									className={item.availability ? "text-danger" : "text-success"}
									color={item.availability ? "danger" : "success"}
									onClick={() => console.log("desactivate")}
								>
									{item.availability
										? "Marcar como no disponible"
										: "Marcar como disponible"}
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</TableCell>
				);
			default:
				return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
		}
	};

	useEffect(() => {
		let isMounted = true;

		// const fetchingProcesses = async () => {
		//   if (!isMounted) return
		//   setIsFetching(true)
		//   const result =
		//     await ProcessesUseCasesImpl.getInstance().getAllProcessesByModuleId(
		//       moduleIdentifier,
		//     )

		//   if (result.processes) {
		//     setProcesses(result.processes)
		//     setIsFetching(false)
		//   }
		// }

		// fetchingProcesses()

		// setProcessUpdate(false)

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div>
			{/* <Button
				onPress={() => {
					setSelectedClient(null);
					onOpen();
				}}
				radius="sm"
				className="w-40 h-12 ml-6 border-2  bg-amber-500 "
			>
				Crear cliente
			</Button> */}

			<div className="m-6">
				<Table aria-label="Example table with dynamic content">
					<TableHeader columns={COLUMNS}>
						{(column) => (
							<TableColumn key={column.key}>{column.label}</TableColumn>
						)}
					</TableHeader>
					<TableBody
						emptyContent={"No existen datos sobre clientes"}
						isLoading={isFetching}
					>
						{products!.map((item) => (
							<TableRow key={item.id}>
								{(columnKey) => resolveRowComponentByColumnKey(item, columnKey)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* <ClientsForm
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				values={selectedClient as IProduct}
			/> */}
		</div>
	);
};

export default InvoiceView;
