import { IProductCategory } from "../types/product";

export const fetchProducts = async () => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
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

		console.log(productData);

		if (!productData) {
			console.log("No se cargaron los productos.");
			return;
		}

		return productData;
	} catch (error) {
		console.log(error);
	}
};
