"use client";
import { useParams, useRouter } from "next/navigation";
import { useProductStore } from "@/app/store/productStore";
import { useEffect, useState } from "react";

const OrderingTable = () => {
	const { tableId } = useParams();
	const { productCategories } = useProductStore();
	const router = useRouter();

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<>
			{isClient && (
				<div className="flex justify-center">
					<div>Soy una mesa dinámica {tableId}</div>
					<div>
						{productCategories &&
							productCategories.map((category) => (
								<div key={category.id}>
									<div >
										{category.name} {category.id}{" "}
									</div>
									<button
										onClick={() =>
											router.push(
												`/mesero/mesa/${tableId}/productos/${category.id}`
											)
										}
									>
										Ver productos
									</button>
								</div>
							))}
					</div>
				</div>
			)}
		</>
	);
};

export default OrderingTable;
