import { IVisit } from "../types/visit";

export const fetchVisit = async (visitId: number) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/visits/master-orders/${visitId}`,
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
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/visits/master-orders`,
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

export const fetchVisitsByYear = async (year : {year: number}) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/visits/get-visits-by-year`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(year),
			}
		);

		if (!response.ok) {
			console.log("Error al obtener las visitas response.");
			return;
		}
		const data = await response.json();
		const visitData: {} = data;

		if (!visitData) {
			console.log("No se cargaron las visitas.");
			return;
		}

		return visitData;
	} catch (error) {
		console.log(error);
	}
}

export const fetchVisitsByYearMonth = async (yearAndMonth :{year: number, month: number}) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/visits/get-visits-by-month`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(yearAndMonth),
			}
		);

		if (!response.ok) {
			console.log("Error al obtener las visitas response.");
			return;
		}
		const data = await response.json();
		const visitData: {} = data;

		if (!visitData) {
			console.log("No se cargaron las visitas.");
			return;
		}

		return visitData;
	} catch (error) {
		console.log(error);
	}
}
