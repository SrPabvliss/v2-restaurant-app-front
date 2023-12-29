import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../types/user";

interface OrderState {
	visitOrders: IVisitOrder[] | undefined;
}

export const useOrdersStore = create<OrderState>(
	persist(
		(set) => ({
			user: undefined,
			setUser: (user: IUser) => set({ user }),
			logout: () => set({ user: undefined }),
		}),
		{
			name: "user",
		}
	) as StateCreator<OrderState>
);
