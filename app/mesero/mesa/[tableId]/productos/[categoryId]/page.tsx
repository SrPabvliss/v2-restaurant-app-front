"use client";
import { useProductStore } from "@/app/store/productStore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface OrderState {
	[productId: number]: number;
}

const ProductByCategory = () => {
	const { categoryId } = useParams();
	const {productCategories, productsLoaded, loadProducts} = useProductStore();
	const [isClient, setIsClient] = useState(false);

	const categoryProducts = productCategories?.find(
		(category) => category.id.toString() === categoryId
	)?.Products;

	
	const [order, setOrder] = useState<OrderState>({});
	
	const addToOrder = (productId: number) => {
		setOrder((prevOrder: OrderState) => ({
			...prevOrder,
			[productId]: (prevOrder[productId] || 0) + 1,
		}));
	};
	
	const removeFromOrder = (productId: number) => {
		setOrder((prevOrder: OrderState) => ({
			...prevOrder,
			[productId]: Math.max((prevOrder[productId] || 0) - 1, 0),
		}));
	};

	useEffect(() => {
		setIsClient(true);
		if (!productsLoaded) {
			loadProducts();
		}
	}, []);

	return (
		<>
		{isClient && (
		<div className="flex justify-center">
			<h1>Productos de la Categoría {categoryId}</h1>
			<div>
				{categoryProducts?.map((product) => (
					<div key={product.id+10} className="product-item">
						<div className="product-name">{product.name} {product.id}</div>
						<div className="product-price">{product.price}</div>
						<div className="product-quantity-control">
							<button onClick={() => removeFromOrder(product.id)}>-</button>
							<span>{order[product.id] || 0}</span>
							<button onClick={() => addToOrder(product.id)}>+</button>
						</div>
					</div>
				))}
			</div>
		</div>
		)}
		</>
	);
};

export default ProductByCategory;
