import React from "react";

const orderSummary = ({ order }: { order: any }) => {
	return (
		<div className="flex flex-col gap-4 w-11/12 border border-slate-300 rounded-lg pb-2">
			<div className="flex justify-between items-center font-semibold text-center bg-amber-500 bg-opacity-85 rounded-t-lg p-4">
				<p className="flex-1">Producto</p>
				<p className="flex-1">Cantidad</p>
				<p className="flex-1">Precio Unitario</p>
				<p className="flex-1">Total por producto</p>
			</div>

			{order?.products.map((product: any) => (
				<div
					className="flex justify-between items-center text-center"
					key={product.id}
				>
					<p className="flex-1">{product.name}</p>
					<p className="flex-1">{product.quantity}</p>
					<p className="flex-1">${product.price}</p>
					<p className="flex-1">${product.price * product.quantity}</p>
				</div>
			))}
		</div>
	);
};

export default orderSummary;
