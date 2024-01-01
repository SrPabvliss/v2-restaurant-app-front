import { StateCreator, create } from "zustand";
import { ICustomer } from "../types/customer";
import { persist } from "zustand/middleware";
import { fetchCustomers } from "../api/useCostumers";

interface StoreState {
    customers : ICustomer[] | undefined;
    customersLoaded : boolean;
    setCustomersLoaded : (loaded : boolean)=>void;
    loadCustomers : ()=>void;
    areCustomersLoading : boolean;
}

export const useCustomerStore = create < StoreState > (persist((set, get)=>({
    areCustomersLoading: false,
    customers: undefined,
    customersLoaded: false,
    setCustomersLoaded: (loaded : boolean)=>set({customersLoaded: loaded}),
    loadCustomers: async()=> {
        if (!useCustomerStore.getState().customersLoaded) {
            set({areCustomersLoading: true});
            const customers = await fetchCustomers();
            set({areCustomersLoading: false});
            console.log('fetchCustomers', customers);
            set({customers, customersLoaded: true});
        }
    }
}), {name: "customer-storage"}) as StateCreator < StoreState >);