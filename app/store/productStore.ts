import { StateCreator, create } from "zustand";
import { IProductCategory, Product } from "../types/product";
import { fetchProducts } from "../api/useProducts";
import { persist } from "zustand/middleware";
import { get } from "http";

interface StoreState {
	productCategories: IProductCategory[] | undefined;
	productsLoaded: boolean;
	getProductById: (id: number) => Product | undefined; 
	setProductsLoaded: (loaded: boolean) => void;
	loadProducts: () => void;
	areProductsLoading: boolean;
}

export const useProductStore = create<StoreState>(
	persist(
		(set, get) => ({
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
			getProductById: (id: number) => {
				if (useProductStore.getState().productCategories) {
					return get().productCategories?.flatMap((category) => category.Products).find((product) => product.id === id);
				}
			},
		}),
		{
			name: "product-storage",
		}
	) as StateCreator<StoreState>
);
