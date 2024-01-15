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

export const updateProduct = async (productId: number) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productId}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			console.log("Error al actualizar el producto.");
			return;
		}

		const data = await response.json();

		if (!data) {
			console.log("No se actualizo el producto.");
			return;
		}

		return data;
	} catch (error) {
		console.log(error);
	}
}

export const fetchGetProductsByYear = async (year :{year: number}) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/get-products-count-by-year`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(year),
			}
		);

		if (!response.ok) {
			console.log("Error al obtener los productos.");
			return;
		}
		const data = await response.json();
		const productData: {} = data;

		if (!productData) {
			console.log("No se cargaron los productos.");
			return;
		}

		return productData;
	} catch (error) {
		console.log(error);
	}
}

export const fetchGetProductsByYearAndMonth = async (yearAndMonth :{year: number, month: number}) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/get-products-count-by-month`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(yearAndMonth),
			}
		);

		if (!response.ok) {
			console.log("Error al obtener los productos.");
			return;
		}
		const data = await response.json();
		const productData: {} = data;

		if (!productData) {
			console.log("No se cargaron los productos.");
			return;
		}

		return productData;
	} catch (error) {
		console.log(error);
	}
}
