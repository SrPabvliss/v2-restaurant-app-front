import { toast } from "react-toastify";
import { Socket } from "socket.io-client";
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import {socket} from "../api/socket";
import { emptyTable, takeTable } from "../api/useTables";

interface StoreState {
	tables: ITable[] | undefined;
	availableTables: ITable[] | undefined;
	occupiedTables: ITable[] | undefined;
    visitTables: IVisitTable[] | undefined;
	tablesLoaded: boolean;
	settablesLoaded: (loaded: boolean) => void;
	loadTables: () => void;
	filterTables: () => void;
	handleTakeTable: (tableId: number) => void;
	handleEmptyTable: (tableId: number) => void;
	areTablesLoading: boolean;
}    


export const useTableStore = create<StoreState>(
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
            socket.on("load-tables", (data: ITable[])=> {
                set({ areTablesLoading: false });
                set({
                    tables: data,
                    tablesLoaded: true,
                });
                get().filterTables();
            });
            socket.emit("get-visits");
            socket.on("load-visits", (data: IVisit[])=> {
                set({
                    visitTables: data.map((visit) => {
                        return {
                            visitId: visit.id,
                            tableId: visit.table.id,
                        };
                    }
                    ),
                });
                
            });


		// }
		get().filterTables();

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
			socket.emit("create-visit", {tableId: tableId});
            socket.on("visit-response", (result: {visitId: number, message: string}) => {
                if (result) { 
                    get().loadTables(); // Actualizar mesas después de ocupar una mesa
                }
            }
            );
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
            console.log("Releasing table", visitId, socket);
			socket.emit("end-visit", {visitId: visitId});
            socket.on("visit-response", (result) => {
                if (result) {
                    
                    get().loadTables(); // Actualizar mesas después de desocupar una mesa
                }
            });
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
})
);

