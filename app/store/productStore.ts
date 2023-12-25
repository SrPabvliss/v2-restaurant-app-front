import { StateCreator, create } from "zustand";
import { IProductCategory } from "../types/product";
import { fetchProducts } from "../api/useProducts";
import { persist } from "zustand/middleware";

interface StoreState {
	productCategories: IProductCategory[] | undefined;
	productsLoaded: boolean;
	setProductsLoaded: (loaded: boolean) => void;
	loadProducts: () => void;
	areProductsLoading: boolean;
}

export const useProductStore = create<StoreState>(
	persist(
		(set) => ({
			areProductsLoading: false,
			productCategories: undefined,
			productsLoaded: false,
			setProductsLoaded: (loaded: boolean) => set({ productsLoaded: loaded }),
			loadProducts: async () => {
				if (!useProductStore.getState().productsLoaded) {
					set({ areProductsLoading: true });
					const productCategories = await fetchProducts();
					set({ areProductsLoading: false });
					console.log('fetchProducts');
					set({ productCategories, productsLoaded: true });
				}
			},
		}),
		{
			name: "product-storage",
		}
	) as StateCreator<StoreState>
);
