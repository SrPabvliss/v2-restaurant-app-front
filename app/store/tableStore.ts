import { create } from "zustand";
import { fetchTables } from "../(login)/api/useTables";

interface StoreState {
    tables: ITable[] | undefined;
    tablesLoaded: boolean;
    settablesLoaded: (loaded: boolean) => void;
    loadTables: () => void;
}

export const useTableStore = create<StoreState>((set) => ({
    tables: undefined,
    tablesLoaded: false,
    settablesLoaded: (loaded: boolean) => set({ tablesLoaded: loaded }), //settablesLoaded manually
    loadTables: async () => {
        if (!useTableStore.getState().tablesLoaded) {
            const tables = await fetchTables(); 
            set({
                tables: tables,
                tablesLoaded: true,
            });
        }
    },
}));