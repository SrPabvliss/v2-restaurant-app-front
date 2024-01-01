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

    // let user;
    // let userRol: string | null = null;
  
    // if (typeof window !== 'undefined') {
    //   user = window.localStorage.getItem("user");
      
    //   if (user) {
    //     const userData = JSON.parse(user);
    //     userRol = userData.state.user.role;
    //   }
    // }
	const { loadOrders, setMasterOrders, getVisitsMasterOrders, filterVisitsServed, setProgressingMasterOrders, setReadyMasterOrders, setMasterServedOrders } = useOrdersStore();

    
    useEffect(() => {
        // Desuscribirse antes de suscribirse de nuevo
        socket.off('create-master-order-response');
      
        // Suscribirse a eventos de socket
        socket.on("create-master-order-response", (result) => {
            if (result) {
                loadOrders(); // Actualizar pedidos después de crear un pedido
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
                loadOrders(); // Actualizar pedidos después de crear un pedido
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


        // Función de limpieza para desuscribirse cuando el componente se desmonte
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
  // Aquí puedes añadir más listeners si es necesario
};
