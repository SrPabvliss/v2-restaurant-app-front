import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../types/user";
import { fetchEmployees } from "../api/useEmployees";

interface StoreState {
	employees: IUser[] | undefined;
	setEmployees: (user: IUser[]) => void;
	setEmployeesLoaded: (loaded: boolean) => void;
	areEmployeesLoading: boolean;
	employeesLoaded: boolean;
	loadEmployees: () => void;
}

export const useEmployeesStore = create<StoreState>(
	persist(
		(set) => ({
			employees: undefined,
			employeesLoaded: false,
			areEmployeesLoading: false,
			setEmployeesLoaded: (loaded: boolean) => set({ employeesLoaded: loaded }),
			setEmployees: (users: IUser[]) => set({ employees: users }),
			loadEmployees: async () => {
				if (!useEmployeesStore.getState().employeesLoaded) {
					set({ areEmployeesLoading: true });
					const employees = await fetchEmployees();
					set({ areEmployeesLoading: false });
					console.log("fetch employees", employees);
					set({ employees , employeesLoaded: true });
				}
			},
		}),
		{
			name: "employees-storage",
		}
	) as StateCreator<StoreState>
);
