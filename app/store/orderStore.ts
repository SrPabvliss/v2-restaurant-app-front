import { create, StateCreator } from "zustand";
import {
  createOrderDto,
  IMasterOrder,
  Order,
  OrderState,
  UnitOrderState,
} from "../types/order";
import { socket } from "../api/socket";
import { persist } from "zustand/middleware";
import { IVisit } from "../types/visit";

interface OrdersState {
  masterOrders: IMasterOrder[] | undefined;
  setMasterOrders: (masterOrders: IMasterOrder[]) => void;
  visitsMasterOrders: IVisit[] | undefined;
  visitsServed: IVisit[] | undefined;
  progressingMasterOrders: IMasterOrder[] | undefined;
  setProgressingMasterOrders: (progressingMasterOrders: IMasterOrder[]) => void;
  readyMasterOrders: IMasterOrder[] | undefined;
  setReadyMasterOrders: (readyMasterOrders: IMasterOrder[]) => void;
  masterServedOrders: IMasterOrder[] | undefined;
  setMasterServedOrders: (masterServedOrders: IMasterOrder[]) => void;
  toQueueOrders: createOrderDto[] | undefined;
  areReadyOrdersLoading: boolean;
  handleCreateMasterOrder: (createOrderDto: createOrderDto) => void;
  handleCleanToQueueOrdersByVisitId: (visitId: number) => void;
  handleChangeStatusOrder: (unitOrderId: number, state: UnitOrderState) => void;
  loadOrders: () => void;
  enqueueOrder: (visitId: number, order: OrderState) => void;
  getVisitsMasterOrders: () => IVisit[] | undefined;
  getEnqueuedOrderByVisitId: (visitId: number) => createOrderDto | undefined;
  getMasterOrderByVisitId: (visitId: number) => IMasterOrder[] | undefined;
  getMasterOrderById: (masterOrderId: number) => IMasterOrder | undefined;
  getReadyOrderById: (orderId: number) => Order | undefined;
  filterVisitsServed: () => IVisit[] | undefined;
}

export const useOrdersStore = create<OrdersState>(
  persist(
    (set, get) => ({
      masterOrders: undefined,
      visitsMasterOrders: undefined,
      visitsServed: undefined,
      progressingMasterOrders: undefined,
      readyMasterOrders: undefined,
      masterServedOrders: undefined,
      areReadyOrdersLoading: false,
      toQueueOrders: undefined,
      handleCreateMasterOrder: (createOrderDto: createOrderDto) => {
        socket.emit("create-master-order", createOrderDto);
      },
      loadOrders: () => {
        set({ areReadyOrdersLoading: true });
        socket.emit("find-active-master-orders");
        console.log("fetchMasterOrders", get().masterOrders);
        socket.emit("find-preparing-master-orders");
        console.log("progressingMasterOrders", get().progressingMasterOrders);
        socket.emit("find-ready-master-orders");
        socket.emit("find-served-master-orders");

        set({ areReadyOrdersLoading: false });
      },
      enqueueOrder: (visitId: number, order: OrderState) => {
        if (order === undefined || Object.keys(order).length === 0) {
          return;
        }
        if (get().toQueueOrders !== undefined) {
          const orderToQueue = get().toQueueOrders?.find(
            (order) => order.visitId === visitId
          );
          if (orderToQueue) {
            Object.keys(order).forEach((key) => {
              const product = orderToQueue?.products.find(
                (product) => product.productId === +key
              );
              if (product && order[+key] === 0) {
                orderToQueue.products = orderToQueue?.products.filter(
                  (product) => product.productId !== +key
                );
              } else if (product) {
                product.quantity = order[product.productId];
              } else {
                orderToQueue?.products.push({
                  productId: +key,
                  quantity: order[+key],
                });
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
          set({
            toQueueOrders: [
              {
                visitId: visitId,
                products: [
                  {
                    productId: +Object.keys(order)[0],
                    quantity: order[+Object.keys(order)[0]],
                  },
                ],
              },
            ],
          });
        }
      },
      getEnqueuedOrderByVisitId: (visitId: number) => {
        if (get().toQueueOrders !== undefined) {
          return get().toQueueOrders?.find(
            (order) => order.visitId === visitId
          );
        }
      },
      handleCleanToQueueOrdersByVisitId: (visitId: number) => {
        if (get().toQueueOrders !== undefined) {
          set({
            toQueueOrders: get().toQueueOrders?.filter(
              (order) => order.visitId !== visitId
            ),
          });
        }
      },
      getMasterOrderByVisitId: (visitId: number) => {
        try {
          const masterOrders = get().masterOrders;

          if (masterOrders) {
            return masterOrders.filter(
              (masterOrder) => masterOrder.visit.id === visitId
            );
          }
        } catch (error) {
          console.log({ error });
        }
      },
      handleChangeStatusOrder: (unitOrderId: number, state: UnitOrderState) => {

        socket.emit("change-status-unit-order", {
          unitOrderId: unitOrderId,
          state: state,
        });

      },
      getReadyOrderById: (orderId: number) => {
        // encontar en masterOrders.masterOrder.orders
        const readyOrder = get().readyMasterOrders?.find((masterOrder) =>
          masterOrder.orders?.find((order) => order.id === orderId)
        );
        if (readyOrder) {
          return readyOrder.orders?.find((order) => order.id === orderId);
        }
      },
      getVisitsMasterOrders: () => {
        if (get().masterOrders !== undefined) {
          const visits = get().masterOrders?.map(
            (masterOrder) => masterOrder.visit
          );
          const reducedVisits = visits?.reduce(
            (unique: IVisit[], o: IVisit) => {
              if (!unique.some((obj) => obj.id === o.id)) {
                unique.push(o);
              }
              return unique;
            },
            []
          );
          const visitMasterOrders = reducedVisits?.map((visit) => {
            return {
              ...visit,
              masterOrders: visit.masterOrders?.map((masterOrder) => {
                return get().getMasterOrderById(masterOrder.id) as IMasterOrder;
              }),
            };
          });
          return visitMasterOrders;
        }
      },
      filterVisitsServed: () => {
        // filtrar visitas que tengan todos sus pedidos en estado SERVED es decir
        const visitsServed = get().visitsMasterOrders?.filter((visit) =>
          visit.masterOrders?.every((masterOrder) =>
            masterOrder.orders?.every((order) =>
              order.unitOrders?.every(
                (unitOrder) => unitOrder.productState === UnitOrderState.SERVED
              )
            )
          )
        );
        return visitsServed;
      },
      getMasterOrderById: (masterOrderId: number) => {
        return get().masterOrders?.find(
          (masterOrder) => masterOrder.id === masterOrderId
        );
      },
      setMasterOrders: (masterOrders: IMasterOrder[]) => {
        set({ masterOrders: masterOrders });
        set({ visitsMasterOrders: get().getVisitsMasterOrders() });
        set({ visitsServed: get().filterVisitsServed() });
      },
      setProgressingMasterOrders: (progressingMasterOrders: IMasterOrder[]) => {
        set({ progressingMasterOrders: progressingMasterOrders });
      },
      setReadyMasterOrders: (readyMasterOrders: IMasterOrder[]) => {
        set({ readyMasterOrders: readyMasterOrders });
      },
      setMasterServedOrders: (masterServedOrders: IMasterOrder[]) => {
        set({ masterServedOrders: masterServedOrders });
      },
    }),
    {
      name: "orders-storage",
    }
  ) as StateCreator<OrdersState>
);
