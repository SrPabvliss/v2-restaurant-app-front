import { StateCreator, create } from "zustand";
import { ICustomer } from "../types/customer";
import { persist } from "zustand/middleware";
import { fetchCustomers } from "../api/useCostumers";

interface StoreState {
  customers: ICustomer[] | undefined;
  customersLoaded: boolean;
  setCustomersLoaded: (loaded: boolean) => void;
  loadCustomers: () => void;
  areCustomersLoading: boolean;
  setCustomers: (customers: ICustomer[]) => void;
}

export const useCustomerStore = create<StoreState>(
  persist(
    (set, get) => ({
      areCustomersLoading: false,
      customers: undefined,
      setCustomers: (customers: ICustomer[]) => set({ customers }),
      customersLoaded: false,
      setCustomersLoaded: (loaded: boolean) => set({ customersLoaded: loaded }),
      loadCustomers: async () => {
        if (!useCustomerStore.getState().customersLoaded) {
          set({ areCustomersLoading: true });
          const customers = await fetchCustomers();
          set({ areCustomersLoading: false });
          set({ customers, customersLoaded: true });
        }
      },
    }),
    { name: "customer-storage" }
  ) as StateCreator<StoreState>
);
