"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	useDisclosure,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	getKeyValue,
	Divider,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EmployeesForm } from "../components/employeeForm";
import { useEmployeesStore } from "@/app/store/employeesStore";
import { IUser } from "@/app/types/user";
import { deleteEmployee } from "@/app/api/useEmployees";

const COLUMNS = [
	{
		key: "firstName",
		label: "Primer nombre",
	},
	{
		key: "secondName",
		label: "Segundo nombre",
	},
	{
		key: "firstLastName",
		label: "Primer apellido",
	},
	{
		key: "secondLastName",
		label: "Segundo apellido",
	},
	{
		key: "email",
		label: "Correo electrónico",
	},
	{
		key: "role",
		label: "Rol",
	},
	{
		key: "actions",
		label: "Acciones",
	},
];
const EmployeesView = () => {
	const {
		employees,
		loadEmployees,
		employeesLoaded,
		setEmployeesLoaded,
		setEmployees,
	} = useEmployeesStore();
	const [isFetching, setIsFetching] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const {
		isOpen: isOpenDelete,
		onOpen: onOpenDelete,
		onOpenChange: onOpenChangeDelete,
	} = useDisclosure();
	const [selectedEmployee, setSelectedEmployee] = useState<IUser | null>(null);
	const [isClient, setIsClient] = useState(false);

	const resolveRowComponentByColumnKey = (item: IUser, columnKey: Key) => {
		switch (columnKey) {
			case "actions":
				return (
					<TableCell>
						<Dropdown>
							<DropdownTrigger>
								<Button variant="light">...</Button>
							</DropdownTrigger>

							<DropdownMenu aria-label="Static Actions">
								<DropdownItem
									key="edit"
									onPress={() => {
										setSelectedEmployee(item);
										onOpen();
									}}
								>
									Editar
								</DropdownItem>
								<DropdownItem
									key="delete"
									color="danger"
									onPress={() => {
										setSelectedEmployee(item);
										onOpenDelete();
									}}
								>
									Eliminar
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

		if (isMounted) {
			if (!employeesLoaded) {
				const loadingEmployees = async () => {
					setIsFetching(true);
					try {
						await loadEmployees();
						setEmployeesLoaded(true);
					} catch (error) {
						toast.error("Error al cargar los clientes");
						console.log(error);
					} finally {
						setIsFetching(false);
					}
				};
				loadingEmployees();
			}
		}
		setIsClient(true);

		return () => {
			isMounted = false;
		};
	}, [employeesLoaded, loadEmployees, setEmployeesLoaded]);

	return (
		<>
			{isClient && (
				<div>
					<Divider className="bg-white" />
					<h1 className="text-2xl font-semibold text-white text-center py-4">
						Gestionar Empleados
					</h1>
					<Divider className="bg-white mb-8" />
					<Button
						onPress={() => {
							setSelectedEmployee(null);
							onOpen();
						}}
						radius="sm"
						className="w-40 h-12 ml-6 border-2  bg-amber-500 "
					>
						Crear empleado
					</Button>

					<div className="m-6">
						<Table
							aria-label="Example table with dynamic content"
							className="max-h-[700px] overflow-y-auto"
						>
							<TableHeader columns={COLUMNS}>
								{(column) => (
									<TableColumn key={column.key}>{column.label}</TableColumn>
								)}
							</TableHeader>
							<TableBody
								emptyContent={"No existen datos sobre procesos"}
								isLoading={isFetching}
							>
								{employees! &&
									employees.map((item) => (
										<TableRow key={item.id}>
											{(columnKey) =>
												resolveRowComponentByColumnKey(item, columnKey) || <></>
											}
										</TableRow>
									))}
							</TableBody>
						</Table>
					</div>

					<EmployeesForm
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						values={selectedEmployee as IUser}
					/>

					<Modal
						isOpen={isOpenDelete}
						onOpenChange={onOpenChangeDelete}
						onClose={() => {
							onOpenChangeDelete();
						}}
						className="min-w-[900px]"
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="text-2xl">
										Eliminar cliente
									</ModalHeader>

									<ModalBody>
										<p>
											¿Está seguro que desea eliminar el cliente{" "}
											{selectedEmployee?.firstName}{" "}
											{selectedEmployee?.firstLastName}?
										</p>
									</ModalBody>
									<ModalFooter>
										<Button
											onClick={() => {
												onClose();
											}}
										>
											Cancelar
										</Button>
										<Button
											color="danger"
											onClick={async () => {
												const result = await deleteEmployee(
													selectedEmployee?.id.toString() as string
												);
												if (result) {
													setEmployees(
														employees?.filter(
															(employee) => employee.id !== selectedEmployee?.id
														) as IUser[]
													);
													toast.success("Cliente eliminado exitosamente");
													onClose();
												} else {
													toast.error("Error al eliminar el cliente", {
														closeButton: false,
													});
												}
												onClose();
											}}
										>
											Eliminar
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			)}
		</>
	);
};

export default EmployeesView;
