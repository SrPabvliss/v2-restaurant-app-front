import { IProductCategory } from "../types/product";

export const fetchProducts = async () => {
	try {
		const response = await fetch(
			`https://restaurant-orders-manager-back-api.onrender.com/categories/products`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			console.log("Error al obtener los productos response.");
			return;
		}
		const data = await response.json();
		const productData: IProductCategory[] = data;

		if (!productData) {
			console.log("No se cargaron los productos.");
			return;
		}

		return productData;
	} catch (error) {
		console.log(error);
	}
};
