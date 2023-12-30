import { Product } from "./product";

export interface Order {
	id: number;
	product: Product;
	quantity: number;	
}
export interface IUnitOrder {
	id: number;
	productState: "PREPARANDO" | "LISTO";
	queuedAt: Date;
	product: Product;
}
export interface IVisitUnitOrder {
	entry: Date;
	exit: Date | null;
	id: number;
	unitOrders: IUnitOrder[];
}

export interface IVisitOrder {
	entry: Date;
	exit: Date | null;
	id: number;
	orders: Order[];
}
export interface createOrderDto {
	visitId: number;
	products: {productId: number; quantity: number}[];
}

export interface OrderState {
	[productId: number]: number;
}