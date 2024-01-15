import { toast } from "react-toastify";
import { socket } from "./socket";
import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { useTableStore } from "../store/tableWsStore";
import { IVisit } from "../types/visit";

export const useTableSocketListeners = () => {
  // let user;
  // let userRol: string | null = null;

  // if (typeof window !== 'undefined') {
  //   user = window.localStorage.getItem("user");

  //   if (user) {
  //     const userData = JSON.parse(user);
  //     userRol = userData.state.user.role;
  //   }
  // }
  const { setTables, setVisitTables, tablesLoaded, loadTables } =
    useTableStore();

  useEffect(() => {
    // Desuscribirse antes de suscribirse de nuevo
    socket.off("load-tables");

    // Suscribirse a eventos de socket
    socket.on("load-tables", (data: ITable[]) => {
      setTables(data);
    });

    socket.off("load-visits");
    socket.on("load-visits", (data: IVisit[]) => {
      setVisitTables(data);
    });

    socket.off("visit-response");
    socket.on(
      "visit-response",
      (result: { visitId: number; message: string }) => {
        if (result) {
          loadTables(); // Actualizar mesas después de ocupar una mesa
        }
      }
    );

    // Función de limpieza para desuscribirse cuando el componente se desmonte
    return () => {
      socket.off("load-tables");
      socket.off("load-visits");
      socket.off("visit-response");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Aquí puedes añadir más listeners si es necesario
};
