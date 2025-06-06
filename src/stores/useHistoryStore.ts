import { create } from "zustand";
import { requestAPI } from "../utils/api";
import { simulateDelay } from "./useSettingsStore";

export type HistoryItem = {
	id: number;
	total: number;
	currency: string;
	timestamp: number;
};

type HistoryItemsState = {
	historyItems: HistoryItem[] | null;
	fetchHistoryItems: () => Promise<void>;
	loading: boolean;
};

export const useHistoryItemsStore = create<HistoryItemsState>((set) => ({
	historyItems: null,
	loading: true,
	fetchHistoryItems: async () => {
		const data = await requestAPI("/history.json", {}, "GET");
		if (!simulateDelay) {
			set({ historyItems: data, loading: !data });
		} else {
			setTimeout(() => {
				set({ historyItems: data, loading: !data });
			}, simulateDelay);
		}
	},
}));
