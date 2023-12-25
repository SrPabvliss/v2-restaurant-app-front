
export const fetchTables = async () => {
	try {
		const response = await fetch(
			`https://restaurant-orders-manager-back-api.onrender.com/tables`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			console.log("Error al obtener las mesas.");
			return;
		}
		const data = await response.json();
		const tableData: ITable[] = data;

		if (!tableData) {
			console.log("Error en la autenticación");
			return;
		}

		return tableData;
	} catch (error) {
		console.log(error);
	}
};


export const takeTable = async (tableId: number) => {
	try {
		const response = await fetch(
			`https://restaurant-orders-manager-back-api.onrender.com/tables/take/${tableId}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			console.log("Error al actaulizar mesa response.");
			return;
		}

		const data = await response.json();
		const tableData: ITable = data;

		if (!tableData) {
			console.log("Error al obtener mesa data.");
			return;
		}

		return tableData;
	} catch (error) {
		console.log(error);
	}
};

export const emptyTable = async (tableId: number) => {
	try {
		const response = await fetch(
			`https://restaurant-orders-manager-back-api.onrender.com/tables/empty/${tableId}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			console.log("Error al actaulizar mesa response.");
			return;
		}

		const data = await response.json();
		const tableData: ITable = data;

		if (!tableData) {
			console.log("Error al obtener mesa data.");
			return;
		}

		return tableData;
	} catch (error) {
		console.log(error);
	}
};
