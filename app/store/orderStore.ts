import { create, StateCreator } from "zustand";
import { createOrderDto, IVisitOrder, IVisitUnitOrder, OrderState } from "../types/order";
import { socket } from "../api/socket";
import { persist } from "zustand/middleware";

interface OrdersState {
	visitUnitOrders: IVisitUnitOrder[] | undefined;
	visitOrders: IVisitOrder[] | undefined;
	toQueueOrders: createOrderDto[] | undefined;
	handleCreateOrder: (createOrderDto: createOrderDto) => void;
	loadOrders: () => void;
	enqueueOrder: (visitId: number, order: OrderState) => void;
}

export const useOrdersStore = create<OrdersState>(
	persist(
		(set, get) => ({
			visitUnitOrders: undefined,
			visitOrders: undefined,
			toQueueOrders: undefined,
			handleCreateOrder: (createOrderDto: createOrderDto) => {
				socket.emit("create-order", createOrderDto);
				get().loadOrders();				
			},
			loadOrders: () => {
				socket.emit("get-visits-with-unit-orders");
				socket.on("load-visits-with-unit-orders", (data: IVisitUnitOrder[]) => {
					set({ visitUnitOrders: data });
				}
				);
				socket.emit("get-visits-with-orders");
				socket.on("load-visits-with-orders", (data: IVisitOrder[]) => {
					set({ visitOrders: data });
				}
				);				
			},
			enqueueOrder: (visitId: number ,order: OrderState) => {
				console.log({order});
				if (order === undefined || Object.keys(order).length === 0) {
					return;
				}
				if (get().toQueueOrders !== undefined ) {
					const orderToQueue = get().toQueueOrders?.find((order) => order.visitId === visitId);
					if (orderToQueue) {
						Object.keys(order).forEach((key) => {
							const product = orderToQueue?.products.find((product) => product.productId === +key);
							if (product && order[+key] === 0) {
								orderToQueue.products = orderToQueue?.products.filter((product) => product.productId !== +key);
							} else if (product) {
								product.quantity = order[product.productId];
							}
							else {
								orderToQueue?.products.push({ productId: +key, quantity: order[+key] });
							}
						});
	
					} else {
						const products = Object.keys(order).map((key) => {
							return { productId: +key, quantity: order[+key] };
						});
						get().toQueueOrders?.push({ visitId: visitId, products: products });
					}
					set({ toQueueOrders: get().toQueueOrders });
				} else {
					set({ toQueueOrders: [{ visitId: visitId, products: [{ productId: +Object.keys(order)[0], quantity: order[+Object.keys(order)[0]] }] }] });
				}
	
				console.log(get().toQueueOrders);
			}
		}),
		{
			name: "orders-storage",
		}
	) as StateCreator<OrdersState>
);

