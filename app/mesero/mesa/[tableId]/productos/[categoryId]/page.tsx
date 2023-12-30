"use client";
import Product from "@/app/mesero/components/Product";
import { useProductStore } from "@/app/store/productStore";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { Button, Divider, Spinner } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface OrderState {
	[productId: number]: number;
}

interface OrderItem {
    productId: number;
    quantity: number;
}

const ProductByCategory = () => {
	const { categoryId } = useParams();
	const {
		productCategories,
		productsLoaded,
		loadProducts,
		areProductsLoading,
	} = useProductStore();
	const [isClient, setIsClient] = useState(false);

	const categoryDetails = productCategories?.find(
		(category) => category.id.toString() === categoryId
	);

	const categoryName = categoryDetails?.name; // Obtendrás el nombre de la categoría aquí
	const categoryProducts = categoryDetails?.Products;

	const [order, setOrder] = useState<OrderItem[]>([]);

const addToOrder = (productId: number) => {
    setOrder((prevOrder: OrderItem[]) => {
        const existingItem = prevOrder.find(item => item.productId === productId);

        if (existingItem) {
            // Si el producto ya existe en el pedido, incrementa su cantidad
            return prevOrder.map(item =>
                item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            // Si el producto no existe en el pedido, añádelo con una cantidad de 1
            return [...prevOrder, { productId, quantity: 1 }];
        }
    });
	console.log(order);
};

const removeFromOrder = (productId: number) => {
	setOrder((prevOrder: OrderItem[]) => {
		const existingItem = prevOrder.find(item => item.productId === productId);

		if (existingItem) {
			// Si el producto ya existe en el pedido, decrementa su cantidad
			return prevOrder.map(item =>
				item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
			);
		} else {
			// Si el producto no existe en el pedido, no hagas nada
			return prevOrder;
		}
	});
	console.log(order);
}


	useEffect(() => {
		setIsClient(true);
		if (!productsLoaded) {
			loadProducts();
		}
	}, []);

	return (
		<>
			{areProductsLoading && (
				<div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
					<Spinner color="warning" />
				</div>
			)}
			{isClient && (
				<>
					<div className="flex gap-4 items-center ">
					
						<div className="text-2xl text-slate-100 py-3">{categoryName}</div>
					</div>
					<Divider className="bg-slate-100 mb-4" />

					<div className="flex justify-center">
						<div className="flex flex-col gap-4 mb-4">
							{categoryProducts?.map((product) => (
								<Product
									key={product.id}
									productId={product.id}
									productName={product.name}
									productPrice={product.price}
									addToOrder={addToOrder}
									removeFromOrder={removeFromOrder}
									order={order}
								/>
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ProductByCategory;
