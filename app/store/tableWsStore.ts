import { toast } from "react-toastify";
import { StateCreator, create } from "zustand";
import { socket } from "../api/socket";
import { persist } from "zustand/middleware";
import { IVisit } from "../types/visit";

interface StoreState {
  tables: ITable[] | undefined;
  availableTables: ITable[] | undefined;
  occupiedTables: ITable[] | undefined;
  visitTables: IVisitTable[] | undefined;
  tablesLoaded: boolean;
  setTables: (tables: ITable[]) => void;
  setVisitTables: (visits: IVisit[]) => void;
  settablesLoaded: (loaded: boolean) => void;
  loadTables: () => void;
  filterTables: () => void;
  handleTakeTable: (tableId: number) => void;
  handleEmptyTable: (tableId: number) => void;
  getVisitIdByTableId: (tableId: number) => number | undefined;
  getTableIdByVisitId: (visitId: number) => number | undefined;
  areTablesLoading: boolean;
}

export const useTableStore = create<StoreState>(
  persist(
    (set, get) => ({
      areTablesLoading: false,
      tables: undefined,
      availableTables: undefined,
      occupiedTables: undefined,
      visitTables: undefined,
      tablesLoaded: false,
      settablesLoaded: (loaded: boolean) => set({ tablesLoaded: loaded }), //settablesLoaded manually
      loadTables: () => {
        //TODO: pensar una manera de no hacer fetch cada vez que se actualizan las mesas
        // if (!useTableStore.getState().tablesLoaded) {
        set({ areTablesLoading: true });
        socket.emit("get-tables");
        // socket.on("load-tables", (data: ITable[])=> {
        // 	set({ areTablesLoading: false });
        // 	set({
        // 		tables: data,
        // 		tablesLoaded: true,
        // 	});
        // 	get().filterTables();
        // });

        //socket.off("load-tables");

        socket.emit("get-visits");
        // socket.on("load-visits", (data: IVisit[])=> {
        // 	const visits = data.filter((visit) => visit.exit === null);
        // 	set({
        // 		visitTables: visits.map((visit) => {
        // 			return {
        // 				visitId: visit.id,
        // 				tableId: visit.table.id,
        // 			};
        // 		}
        // 		),
        // 	});
        // 	console.log('fetchVisits' , get().visitTables);
        // });
        //socket.off("load-visits");

        // }
        get().filterTables();
      },
      setTables: (tables: ITable[]) => {
        set({ tablesLoaded: true });
        set({ tables: tables });
        get().filterTables();
        set({ areTablesLoading: false });
      },
      setVisitTables: (visits: IVisit[]) => {
        set({
          visitTables: visits.map((visit) => {
            return {
              visitId: visit.id,
              tableId: visit.table.id,
            };
          }),
        });
      },
      filterTables: () => {
        const state = useTableStore.getState();
        if (state.tables) {
          const sortedTables = [...state.tables].sort((a, b) => a.id - b.id);
          const available = sortedTables.filter((table) => table.availability);
          const occupied = sortedTables.filter((table) => !table.availability);
          set({ availableTables: available, occupiedTables: occupied });
        }
      },
      handleTakeTable: (tableId: number) => {
        try {
          socket.emit("create-visit", { tableId: tableId });
          // socket.on("visit-response", (result: {visitId: number, message: string}) => {
          // 	if (result) {
          // 		get().loadTables(); // Actualizar mesas después de ocupar una mesa
          // 	}
          // }
          // );
          toast.success("Mesa ocupada correctamente", {
            position: "bottom-center",
            autoClose: 1800,
          });
        } catch (error) {
          console.error("Error al ocupar la mesa:", error);
          toast.error("Error al ocupar la mesa", {
            position: "bottom-center",
            autoClose: 1800,
          });
        }
      },
      handleEmptyTable: (visitId: number) => {
        try {
          socket.emit("end-visit", { visitId: visitId });
          // socket.on("visit-response", (result) => {
          // 	if (result) {

          // 		get().loadTables(); // Actualizar mesas después de desocupar una mesa
          // 	}
          // });
          toast.success("Mesa desocupada correctamente", {
            position: "bottom-center",
            autoClose: 1800,
          });
        } catch (error) {
          console.error("Error al desocupar la mesa:", error);
          toast.error("Error al desocupar la mesa", {
            position: "bottom-center",
            autoClose: 1800,
          });
        }
      },
      getVisitIdByTableId: (tableId: number) => {
        if (get().visitTables) {
          return get().visitTables?.find((visit) => visit.tableId === tableId)
            ?.visitId;
        }
      },
      getTableIdByVisitId: (visitId: number) => {
        if (get().visitTables) {
          return get().visitTables?.find((visit) => visit.visitId === visitId)
            ?.tableId;
        }
      },
    }),
    {
      name: "table-storage",
    }
  ) as StateCreator<StoreState>
);
