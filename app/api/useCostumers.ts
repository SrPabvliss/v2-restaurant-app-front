import { ICustomer } from "../types/customer";

export const fetchCustomers = async () => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/customers`,
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
		const custormers: ICustomer[] = data;

		if (!custormers) {
			console.log("No se cargaron los clientes.");
			return;
		}

		return custormers;
	} catch (error) {
		console.log(error);
	}
};

export const createCustomer = async (customer: ICustomer) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/customers`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(customer),
			}
		);

		if (!response.ok) {
			console.log("Error al crear el cliente.");
			return;
		}

		const data = await response.json();
		const newCustomer: ICustomer = data;

		if (!newCustomer) {
			console.log("No se creó el cliente.");
			return;
		}

		return newCustomer;
	} catch (error) {
		console.log(error);
	}
};

export const updateCustomer = async (id: string, customer: Partial<ICustomer>) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/customers/${id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(customer),
				mode: "cors",
			}
		);

		if (!response.ok) {
			console.log("Error al actualizar el cliente.");
			return;
		}

		const data = await response.json();
		const updatedCustomer: ICustomer = data;

		if (!updatedCustomer) {
			console.log("No se actualizó el cliente.");
			return;
		}

		return updatedCustomer;
	} catch (error) {
		console.log(error);
	}
};

export const deleteCustomer = async (id: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/customers/${id}`,
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
		const deletedCustomer: ICustomer = data;

		if (!deletedCustomer) {
			console.log("No se eliminó el cliente.");
			return;
		}

		return deletedCustomer;
	} catch (error) {
		console.log(error);
	}
};