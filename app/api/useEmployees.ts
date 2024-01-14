import { IUser } from "../types/user";

export const fetchEmployees = async () => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			console.log("Error al obtener los clientes.");
			return;
		}
		const data = await response.json();
		const custormers: IUser[] = data;

		if (!custormers) {
			console.log("No se cargaron los clientes.");
			return;
		}

		return custormers;
	} catch (error) {
		console.log(error);
	}
};

export const createEmployee = async (employee: IUser) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(employee),
			}
		);

		if (!response.ok) {
			console.log("Error al crear el cliente.");
			return;
		}

		const data = await response.json();
		const newEmployee: IUser = data;

		if (!newEmployee) {
			console.log("No se creó el cliente.");
			return;
		}

		return newEmployee;
	} catch (error) {
		console.log(error);
	}
};

export const updateEmployee = async (id: string, customer: Partial<IUser>) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(customer),
			}
		);

		if (!response.ok) {
			console.log("Error al actualizar el cliente.");
			return;
		}

		const data = await response.json();
		const updatedCustomer: IUser = data;

		if (!updatedCustomer) {
			console.log("No se actualizó el cliente.");
			return;
		}

		return updatedCustomer;
	} catch (error) {
		console.log(error);
	}
};

export const deleteEmployee = async (id: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			console.log("Error al eliminar el cliente.");
			return;
		}

		const data = await response.json();
		const deletedCustomer: IUser = data;

		if (!deletedCustomer) {
			console.log("No se eliminó el cliente.");
			return;
		}

		return deletedCustomer;
	} catch (error) {
		console.log(error);
	}
};
