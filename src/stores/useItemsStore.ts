// stores/useItemsStore.ts
import { create } from "zustand";
import { requestAPI } from "../utils/api";
import { simulateDelay } from "./useSettingsStore";

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
	loading: boolean;
};

export const useItemsStore = create<ItemsState>((set) => ({
	items: null,
	loading: true,
	fetchItems: async () => {
		const data = await requestAPI("/items.json", {}, "GET");
		if (!simulateDelay) {
			set({ items: data, loading: !data });
		} else {
			setTimeout(() => {
				set({ items: data, loading: !data });
			}, simulateDelay);
		}
	},
}));
