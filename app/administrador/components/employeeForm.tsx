import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	Switch,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useEmployeeForm } from "../hooks/useEmployeeForm";
import { IUser } from "@/app/types/user";

interface ProcessesFormProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	values?: IUser;
	isSubmitting?: boolean;
}

export const EmployeesForm = ({
	isOpen,
	onOpenChange,
	values,
}: ProcessesFormProps) => {
	const isAddMode = !values?.id;
	const { formik } = useEmployeeForm(values ?? ({} as IUser), () =>
		onOpenChange(false)
	);

	useEffect(() => {
		if (isAddMode) return;
		const initialValues = {
			...values,
			role: values.role.toUpperCase(), 
		};
		formik.setValues(initialValues);
		console.log(initialValues);
	}, [values]);

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			onClose={() => {
				formik.resetForm();
				onOpenChange(false);
			}}
			className="min-w-[900px]"
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{isAddMode ? "Crear empleado" : "Editar empleado"}
						</ModalHeader>

						<form onSubmit={formik.handleSubmit}>
							<ModalBody className="grid grid-cols-2">
								<Input
									id="id"
									name="id"
									type="name"
									label="Cédula"
									variant="underlined"
									placeholder="Eg. Ingeniería en Sistemas"
									className="w-full"
									value={formik.values.id}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									size="lg"
									errorMessage={
										formik.touched.id && formik.errors.id
											? formik.errors.id
											: ""
									}
								/>
								<Input
									id="firstName"
									name="firstName"
									type="name"
									label="Primer nombre"
									variant="underlined"
									placeholder="Eg. Ingeniería en Sistemas"
									className="w-full"
									value={formik.values.firstName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									size="lg"
									errorMessage={
										formik.touched.firstName && formik.errors.firstName
											? formik.errors.firstName
											: ""
									}
								/>

								<Input
									id="secondName"
									name="secondName"
									type="name"
									label="Segundo nombre"
									variant="underlined"
									placeholder="Eg. Ingeniería en Sistemas"
									className="w-full"
									value={formik.values.secondName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									size="lg"
									errorMessage={
										formik.touched.secondName && formik.errors.secondName
											? formik.errors.secondName
											: ""
									}
								/>

								<Input
									id="firstLastName"
									name="firstLastName"
									type="name"
									label="Primer apellido"
									variant="underlined"
									placeholder="Eg. Ingeniería en Sistemas"
									className="w-full"
									value={formik.values.firstLastName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									size="lg"
									errorMessage={
										formik.touched.firstLastName &&
										formik.errors.firstLastName
											? formik.errors.firstLastName
											: ""
									}
								/>

								<Input
									id="secondLastName"
									name="secondLastName"
									type="name"
									label="Segundo apellido"
									variant="underlined"
									placeholder="Eg. Ingeniería en Sistemas"
									className="w-full"
									value={formik.values.secondLastName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									size="lg"
									errorMessage={
										formik.touched.secondLastName &&
										formik.errors.secondLastName
											? formik.errors.secondLastName
											: ""
									}
								/>

								<Input
									id="email"
									name="email"
									type="name"
									label="Correo electrónico"
									variant="underlined"
									placeholder="Eg. Ingeniería en Sistemas"
									className="w-full"
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									size="lg"
									errorMessage={
										formik.touched.email && formik.errors.email
											? formik.errors.email
											: ""
									}
								/>

								<Input
									id="phoneNumber"
									name="phoneNumber"
									type="name"
									label="Número de teléfono"
									variant="underlined"
									placeholder="Eg. Ingeniería en Sistemas"
									className="w-full"
									value={formik.values.phoneNumber}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									size="lg"
									errorMessage={
										formik.touched.phoneNumber && formik.errors.phoneNumber
											? formik.errors.phoneNumber
											: ""
									}
								/>

								<Input
									id="address"
									name="address"
									type="name"
									label="Dirección"
									variant="underlined"
									placeholder="Eg. Ingeniería en Sistemas"
									className="w-full"
									value={formik.values.address}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									size="lg"
									errorMessage={
										formik.touched.address && formik.errors.address
											? formik.errors.address
											: ""
									}
								/>

								<Input
									id="user"
									name="user"
									type="name"
									label="Usuario"
									variant="underlined"
									placeholder="Eg. Ingeniería en Sistemas"
									className="w-full"
									value={formik.values.user}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									size="lg"
									errorMessage={
										formik.touched.user && formik.errors.user
											? formik.errors.user
											: ""
									}
								/>

								<Input
									id="password"
									name="password"
									type="name"
									label="Contraseña"
									variant="underlined"
									placeholder="Eg. Ingeniería en Sistemas"
									className="w-full"
									value={formik.values.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									size="lg"
									errorMessage={
										formik.touched.password && formik.errors.password
											? formik.errors.password
											: ""
									}
								/>

								<Select
									id="role"
									name="role"
									label="Rol"
									placeholder="Seleccione un rol"
									className="w-full"
									defaultSelectedKeys={formik.values.role}
									onChange={(e) =>
										formik.setFieldValue("role", e.target.value.toUpperCase())
									}
									onBlur={formik.handleBlur}
									size="lg"
								>
									<SelectItem key="ADMINISTRADOR" value="ADMINISTRADOR">
										ADMINISTRADOR
									</SelectItem>
									<SelectItem key="MESERO" value="MESERO">
										MESERO
									</SelectItem>
									<SelectItem key="CAJERO" value="CAJERO">
										CAJERO
									</SelectItem>
									<SelectItem key="CHEF" value="CHEF">
										CHEF
									</SelectItem>
								</Select>
							</ModalBody>

							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={() => {
										formik.resetForm();
										onClose();
									}}
								>
									Cancelar
								</Button>

								<Button
									color="primary"
									isDisabled={formik.isSubmitting}
									type="submit"
								>
									{isAddMode ? "Crear" : "Editar"}
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
