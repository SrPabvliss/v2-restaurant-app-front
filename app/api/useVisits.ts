import { IVisit } from "../types/visit";

export const fetchVisit = async (visitId: number) => {
	try {
		const response = await fetch(
			`http://localhost:3001/api/visits/master-orders/${visitId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			console.log("Error al obtener las visitas response.");
			return;
		}
		const data = await response.json();
		const visitData: IVisit = data;

		if (!visitData) {
			console.log("No se cargaron las visitas.");
			return;
		}

		return visitData;
	} catch (error) {
		console.log(error);
	}
};

export const fetchVisits = async () => {
	try {
		const response = await fetch(
			`http://localhost:3001/api/visits/master-orders`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			console.log("Error al obtener las visitas response.");
			return;
		}
		const data = await response.json();
		const visitData: IVisit[] = data;

		if (!visitData) {
			console.log("No se cargaron las visitas.");
			return;
		}

		return visitData;
	} catch (error) {
		console.log(error);
	}
};