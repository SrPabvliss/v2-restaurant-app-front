export interface Order {
	id: number;
	product: {
		id: number;
		name: string;
		price: number;
	};
	status: string;
	visit: {
		id: number;
		tableId: number;
	};
    img?: string;
}

export interface QuantityOrder extends Order {
	quantity: number;
}

export interface IGroupedOrders {
	[key: number]: QuantityOrder[]; // This is an index signature
}

export interface 
