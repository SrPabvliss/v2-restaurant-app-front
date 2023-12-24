import { StateCreator, create } from "zustand";
import { IProductCategory } from "../(login)/types/product";
import { fetchProducts } from "../(login)/api/useProducts";
import { persist } from "zustand/middleware";

interface StoreState {
	productCategories: IProductCategory[] | undefined;
	productsLoaded: boolean;
	setProductsLoaded: (loaded: boolean) => void;
	loadProducts: () => void;
}

export const useProductStore = create<StoreState>(
	persist(
		(set) => ({
			productCategories: undefined,
			productsLoaded: false,
			setProductsLoaded: (loaded: boolean) => set({ productsLoaded: loaded }),
			loadProducts: async () => {
				if (!useProductStore.getState().productsLoaded) {
					const productCategories = await fetchProducts();
					console.log('fetchProducts');
					set({ productCategories, productsLoaded: true });
				}
			},
		}),
		{
			name: "product-storage", // El nombre bajo el cual se guardará en el almacenamiento local
		}
	) as StateCreator<StoreState> // Uso de as StateCreator para el tipo
);
