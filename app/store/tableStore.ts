import { StateCreator, create } from "zustand";
import { emptyTable, fetchTables, takeTable } from "../api/useTables";
import { toast } from "react-toastify";
import { persist } from "zustand/middleware";

interface StoreState {
	tables: ITable[] | undefined;
	availableTables: ITable[] | undefined;
	occupiedTables: ITable[] | undefined;
	tablesLoaded: boolean;
	settablesLoaded: (loaded: boolean) => void;
	loadTables: () => void;
	filterTables: () => void;
	handleTakeTable: (tableId: number) => void;
	handleEmptyTable: (tableId: number) => void;
	areTablesLoading: boolean;
}

//TODO - Crear un estado de carga para mostrar un spinner mientras se cargan las mesas
export const useTableStore = create<StoreState>(
    (set, get) => ({
	areTablesLoading: false,
	tables: undefined,
	availableTables: undefined,
	occupiedTables: undefined,
	tablesLoaded: false,
	settablesLoaded: (loaded: boolean) => set({ tablesLoaded: loaded }), //settablesLoaded manually
	loadTables: async () => {
        //TODO: pensar una manera de no hacer fetch cada vez que se actualizan las mesas
		// if (!useTableStore.getState().tablesLoaded) {
			set({ areTablesLoading: true });
			const tables = await fetchTables();
			set({ areTablesLoading: false });
			set({
				tables: tables,
				tablesLoaded: true,
			});
			get().filterTables();
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
	handleTakeTable: async (tableId: number) => {
		try {
			const result = await takeTable(tableId);
			if (result) {
				toast.success("Mesa ocupada correctamente", {
					position: "bottom-center",
					autoClose: 1800,
				});
				get().loadTables(); // Actualizar mesas después de ocupar una mesa
			}
		} catch (error) {
			console.error("Error al ocupar la mesa:", error);
			toast.error("Error al ocupar la mesa", {
				position: "bottom-center",
				autoClose: 1800,
			});
		}
	},
	handleEmptyTable: async (tableId: number) => {
		try {
			const result = await emptyTable(tableId);
			if (result) {
				toast.success("Mesa desocupada correctamente", {
					position: "bottom-center",
					autoClose: 1800,
				});
				get().loadTables(); // Actualizar mesas después de desocupar una mesa
			}
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


//TODO: Probar con una buena conexión a internet para confirmar que funciona igual de rápido que sin persistencia

// export const useTableStore = create<StoreState>(
// 	persist(
// 		(set, get) => ({
// 			tables: undefined,
// 			availableTables: undefined,
// 			occupiedTables: undefined,
// 			tablesLoaded: false,
// 			settablesLoaded: (loaded: boolean) => set({ tablesLoaded: loaded }), //settablesLoaded manually
// 			loadTables: async () => {
// 				// if (!useTableStore.getState().tablesLoaded) {
// 				const tables = await fetchTables();
// 				set({
// 					tables: tables,
// 					tablesLoaded: true,
// 				});
// 				get().filterTables();
// 				// }
// 				get().filterTables();
// 			},
// 			filterTables: () => {
// 				const state = useTableStore.getState();
// 				if (state.tables) {
// 					const available = state.tables.filter((table) => table.availability);
// 					const occupied = state.tables.filter((table) => !table.availability);
// 					set({ availableTables: available, occupiedTables: occupied });
// 				}
// 			},
// 			handleTakeTable: async (tableId: number) => {
// 				try {
// 					const result = await takeTable(tableId);
// 					if (result) {
// 						toast.success("Mesa ocupada correctamente", {
// 							position: "bottom-center",
// 							autoClose: 1800,
// 						});
// 						get().loadTables(); // Actualizar mesas después de ocupar una mesa
// 					}
// 				} catch (error) {
// 					console.error("Error al ocupar la mesa:", error);
// 					toast.error("Error al ocupar la mesa", {
// 						position: "bottom-center",
// 						autoClose: 1800,
// 					});
// 				}
// 			},
// 			handleEmptyTable: async (tableId: number) => {
// 				try {
// 					const result = await emptyTable(tableId);
// 					if (result) {
// 						toast.success("Mesa desocupada correctamente", {
// 							position: "bottom-center",
// 							autoClose: 1800,
// 						});
// 						get().loadTables(); // Actualizar mesas después de desocupar una mesa
// 					}
// 				} catch (error) {
// 					console.error("Error al desocupar la mesa:", error);
// 					toast.error("Error al desocupar la mesa", {
// 						position: "bottom-center",
// 						autoClose: 1800,
// 					});
// 				}
// 			},
// 		}),
// 		{
// 			name: "table-storage",
// 		}
// 	) as StateCreator<StoreState>
// );
