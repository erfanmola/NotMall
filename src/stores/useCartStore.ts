import { create } from "zustand";
import { persist } from "zustand/middleware";

type Cart = Record<string, number>;

interface CartStore {
	cart: Cart;
	increment: (id: string) => void;
	decrement: (id: string) => void;
	remove: (id: string) => void;
	clear: () => void;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set) => ({
			cart: {},

			increment: (id) =>
				set((state) => ({
					cart: {
						...state.cart,
						[id]: (state.cart[id] || 0) + 1,
					},
				})),

			decrement: (id) =>
				set((state) => {
					const currentQty = state.cart[id] || 0;
					if (currentQty <= 1) {
						const { [id]: _, ...rest } = state.cart;
						return { cart: rest };
					}
					return {
						cart: {
							...state.cart,
							[id]: currentQty - 1,
						},
					};
				}),

			remove: (id) =>
				set((state) => {
					const { [id]: _, ...rest } = state.cart;
					return { cart: rest };
				}),

			clear: () => set({ cart: {} }),
		}),
		{
			name: "cart-storage",
		},
	),
);
