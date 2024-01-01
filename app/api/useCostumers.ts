import { ICustomer } from "../types/customer";

export const fetchCustomers = async () => {
	try {
		const response = await fetch(
			`http://localhost:3001/api/customers`,
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