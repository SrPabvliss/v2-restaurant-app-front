import { create, StateCreator } from "zustand";
import { createOrderDto,  IMasterOrder,  OrderState, UnitOrderState } from "../types/order";
import { socket } from "../api/socket";
import { persist } from "zustand/middleware";

interface OrdersState {
	masterOrders: IMasterOrder[] | undefined;
	progressingMasterOrders: IMasterOrder[] | undefined;
	readyMasterOrders: IMasterOrder[] | undefined;
	masterServedOrders: IMasterOrder[] | undefined;
	toQueueOrders: createOrderDto[] | undefined;
	areReadyOrdersLoading: boolean;
	handleCreateMasterOrder: (createOrderDto: createOrderDto) => void;
	handleCleanToQueueOrdersByVisitId: (visitId: number) => void;
	handleChangeStatusOrder: (unitOrderId: number, state: UnitOrderState) => void;
	loadOrders: () => void;
	enqueueOrder: (visitId: number, order: OrderState) => void;
	getEnqueuedOrderByVisitId: (visitId: number) => createOrderDto | undefined;
	getMasterOrderByVisitId: (visitId: number) => IMasterOrder[] | undefined;
}

export const useOrdersStore = create<OrdersState>(
	persist(
		(set, get) => ({
			masterOrders: undefined,
			progressingMasterOrders: undefined,
			readyMasterOrders: undefined,
			masterServedOrders: undefined,
			areReadyOrdersLoading: false,
			toQueueOrders: undefined,
			handleCreateMasterOrder: (createOrderDto: createOrderDto) => {
				socket.emit("create-master-order", createOrderDto);
				socket.on("create-master-order-response", (result) => {
					if (result) {
						get().loadOrders(); // Actualizar pedidos después de crear un pedido
					}
				}
				);
				socket.on("create-master-order-error", (result) => {
					if (result) {
						console.log(result);
					}
				}
				);
			},
			loadOrders: () => {
				set({ areReadyOrdersLoading: true });
				socket.emit("find-active-master-orders");
				socket.on("load-active-master-orders", (data: IMasterOrder[]) => {
					set({ masterOrders: data });
				}
				);
				socket.on("load-active-master-orders-error", (result) => {
					if (result) {
						console.log(result);
					}
				}
				);
				console.log('fetchMasterOrders', get().masterOrders)

				socket.emit("find-preparing-master-orders");
				socket.on("load-preparing-master-orders", (data: IMasterOrder[]) => {
					set({ progressingMasterOrders: data });
				}
				);
				socket.on("load-preparing-master-orders-error", (result) => {
					if (result) {
						console.log(result);
					}
				}
				);
				console.log('progressingMasterOrders', get().progressingMasterOrders)

				socket.emit("find-ready-master-orders");
				socket.on("load-ready-master-orders", (data: IMasterOrder[]) => {
					set({ readyMasterOrders: data });
				}
				);
				socket.on("load-ready-master-orders-error", (result) => {
					if (result) {
						console.log(result);
					}
				}
				);
				console.log('readyMasterOrders', get().readyMasterOrders)

				socket.emit("find-served-master-orders");
				socket.on("load-served-master-orders", (data: IMasterOrder[]) => {
					set({ masterServedOrders: data });
				}
				);
				socket.on("load-served-master-orders-error", (result) => {
					if (result) {
						console.log(result);
					}
				}
				);
				console.log('masterServedOrders', get().masterServedOrders)

				set({ areReadyOrdersLoading: false });
			},
			enqueueOrder: (visitId: number ,order: OrderState) => {
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
			},
			getEnqueuedOrderByVisitId: (visitId: number) => {
				if (get().toQueueOrders !== undefined) {
					return get().toQueueOrders?.find((order) => order.visitId === visitId);
				}
			},
			handleCleanToQueueOrdersByVisitId: (visitId: number) => {
				if (get().toQueueOrders !== undefined) {
					set({ toQueueOrders: get().toQueueOrders?.filter((order) => order.visitId !== visitId) });
				}
			},
			getMasterOrderByVisitId: (visitId: number) => {
				try {
				  const masterOrders = get().masterOrders;
				  
				  if (masterOrders) {
					return masterOrders.filter((masterOrder) => masterOrder.visit.id === visitId);
				  }
				}
				catch (error) {
				  console.log({error});
				}
			  },
			handleChangeStatusOrder: (unitOrderId: number, state: UnitOrderState) => {
				socket.emit("change-status-unit-order", { unitOrderId: unitOrderId, state: state });
				socket.on("change-status-unit-order-response", (result) => {
					if (result) {
						get().loadOrders(); // Actualizar pedidos después de cambiar el estado de un pedido
					}
				}
				);
				socket.on("change-status-unit-order-error", (result) => {
					if (result) {
						console.log(result);
					}
				}
				);
			},			  
		}),
		{
			name: "orders-storage",
		}
	) as StateCreator<OrdersState>
);

