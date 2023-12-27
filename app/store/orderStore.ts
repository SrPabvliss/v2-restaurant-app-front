import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../types/user";

interface OrderState {
	user: IUser | undefined;
	setUser: (user: IUser) => void;
	logout: () => void;
}

export const useUserStore = create<OrderState>(
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
