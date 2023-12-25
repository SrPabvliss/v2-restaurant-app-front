"use client";
import { useParams } from "next/navigation";
import { useProductStore } from "@/app/store/productStore";
import { useEffect, useState } from "react";
import { Button, Divider } from "@nextui-org/react";
import ProductCategory from "../../components/ProductCategory";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";

const OrderingTable = () => {
	const { tableId } = useParams();
	const { productCategories } = useProductStore();
	const [ isClient, setIsClient ] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<>
			<div className="flex gap-4 items-center">
				<Button
					isIconOnly
					size="sm"
					className="my-4 ml-4 w-2 px-0"
					onClick={() => {
						window.history.back();
					}}
				>
					<ChevronLeftIcon />
				</Button>
				<div className="text-2xl text-slate-100 py-3">
					Orden para la mesa {tableId}
				</div>
			</div>
			<Divider className="bg-slate-100 mb-4" />
			{isClient && (
				<div className="flex flex-col items-center justify-center mb-4">
					<div className="flex flex-col gap-4">
						{productCategories &&
							productCategories.map((category) => (
								<ProductCategory
									key={category.id}
									categoryId={category.id}
									categoryName={category.name}
									productsLength={category.Products.length}
								/>
							))}
					</div>
				</div>
			)}
		</>
	);
};

export default OrderingTable;
