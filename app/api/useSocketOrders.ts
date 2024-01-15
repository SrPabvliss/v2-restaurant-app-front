import { toast } from "react-toastify";
import { socket } from "./socket";
import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { useTableStore } from "../store/tableWsStore";
import { IVisit } from "../types/visit";
import { useOrdersStore } from "../store/orderStore";
import { IMasterOrder } from "../types/order";
import { off } from "process";


export const useOrdersSocketListeners = () => {

	const { loadOrders, setMasterOrders, getVisitsMasterOrders, filterVisitsServed, setProgressingMasterOrders, setReadyMasterOrders, setMasterServedOrders } = useOrdersStore();

    
    useEffect(() => {
        socket.off('create-master-order-response');
      
        socket.on("create-master-order-response", (result) => {
            if (result) {
                loadOrders(); 
            }
        }
        );

        socket.off("create-master-order-error");
        socket.on("create-master-order-error", (result) => {
            if (result) {
                console.log(result);
            }
        }
        );

        socket.off("load-active-master-orders");
        socket.on("load-active-master-orders", (data: IMasterOrder[]) => {
            setMasterOrders(data);
        }
        );
        
        socket.off("load-active-master-orders-error");
        socket.on("load-active-master-orders-error", (result) => {
            if (result) {
                console.log(result);
            }
        }
        );

        socket.off("load-visits-master-orders");
        socket.on("load-preparing-master-orders", (data: IMasterOrder[]) => {
            setProgressingMasterOrders(data);
        }
        );

        socket.off("load-preparing-master-orders-error");
        socket.on("load-preparing-master-orders-error", (result) => {
            if (result) {
                console.log(result);
            }
        }
        );


        socket.off("load-ready-master-orders");
        socket.on("load-ready-master-orders", (data: IMasterOrder[]) => {
            setReadyMasterOrders(data);
        }
        );

        socket.off("load-ready-master-orders-error");
        socket.on("load-ready-master-orders-error", (result) => {
            if (result) {
                console.log(result);
            }
        }
        );

        socket.off("load-served-master-orders");
        socket.on("load-served-master-orders", (data: IMasterOrder[]) => {
            setMasterServedOrders(data);
        }
        );

        socket.off("load-served-master-orders-error");
        socket.on("load-served-master-orders-error", (result) => {
            if (result) {
                console.log(result);
            }
        }
        );

        socket.off("change-status-unit-order-response");
        socket.on("change-status-unit-order-response", (result) => {
            if (result) {
                loadOrders();
            }
        }
        );

        socket.off("change-status-unit-order-error");
        socket.on("change-status-unit-order-error", (result) => {
            if (result) {
                console.log(result);
            }
        }
        );


        return () => {
            socket.off('create-master-order-response');
            socket.off('create-master-order-error');
            socket.off('load-active-master-orders');
            socket.off('load-active-master-orders-error');
            socket.off('load-preparing-master-orders');
            socket.off('load-preparing-master-orders-error');
            socket.off('load-ready-master-orders');
            socket.off('load-ready-master-orders-error');
            socket.off('load-served-master-orders');
            socket.off('load-served-master-orders-error');
            socket.off('change-status-unit-order-response');
            socket.off('change-status-unit-order-error');
            
        };
		// eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
};
