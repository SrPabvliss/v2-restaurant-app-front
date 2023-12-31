import { Product } from "./product";

export interface Order {
	id: number;
	product: Product;
	quantity: number;
	queuedAt: Date;
	unitOrders?: IUnitOrder[];
}
export interface IUnitOrder {
	id: number;
	product: Product;
	productState: UnitOrderState;
}

export enum UnitOrderState {
	QUEUED = "PREPARANDO",
	READY = "LISTO",
	SERVED = "SERVIDO",
}

export interface IMasterOrder {
	id: number;
	visit: IVisit;
	createAt: Date;
	orders?: Order[];
}
export interface createOrderDto {
	visitId: number;
	products: {productId: number; quantity: number}[];
}

export interface OrderState {
	[productId: number]: number;
}