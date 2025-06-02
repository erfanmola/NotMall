// stores/useItemsStore.ts
import { create } from "zustand";
import { requestAPI } from "../utils/api";

export type Item = {
	id: number;
	name: string;
	category: string;
	description: string;
	price: number;
	currency: string;
	left: number;
	tags: Record<string, string>;
	images: string[];
};

type ItemsState = {
	items: Item[] | null;
	fetchItems: () => Promise<void>;
};

export const useItemsStore = create<ItemsState>((set) => ({
	items: null,
	fetchItems: async () => {
		const data = await requestAPI("/items.json", {}, "GET");
		if (data) {
			set({ items: data });
		}
	},
}));
