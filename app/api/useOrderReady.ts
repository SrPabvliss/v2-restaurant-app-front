import { toast } from "react-toastify";
import { socket } from "./socket";
import { useEffect } from "react";


export const useSocketListeners = () => {

    let user;
    let userRol: string | null = null;
  
    if (typeof window !== 'undefined') {
      user = window.localStorage.getItem("user");
      
      if (user) {
        const userData = JSON.parse(user);
        userRol = userData.state.user.role;
      }
    }
    useEffect(() => {
        // Desuscribirse antes de suscribirse de nuevo
        socket.off('order-ready');
      
        // Suscribirse a eventos de socket
        socket.on("order-ready", (result) => {
          if (result && userRol === "MESERO") {
            toast.info(`Nuevo platillo listo para servir`, {
              position: "top-center",
              autoClose: 1200,
            });
          }
        });
      
        // Función de limpieza para desuscribirse cuando el componente se desmonte
        return () => {
          socket.off('order-ready');
        };
      }, [userRol]);
  // Aquí puedes añadir más listeners si es necesario
};
