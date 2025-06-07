import type { Locale } from "../i18n/i18nProvider";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Settings = {
	language: Locale;
	haptics: { enabled: boolean };
	reduceMotion: { enabled: boolean };
	slowNetwork: { enabled: boolean };
	emptyItems: { enabled: boolean };
};

interface SettingsStore {
	settings: Settings;
	setSettings: (settings: Settings) => void;
}

const defaultSettings: Settings = {
	language: "en",
	haptics: { enabled: true },
	reduceMotion: { enabled: false },
	slowNetwork: { enabled: false },
	emptyItems: { enabled: false },
};

export let simulateDelay = 0;
export let motionMultiplier = 1;

export let settingsNonReactive: Settings = {
	...defaultSettings,
};

export const useSettingsStore = create<SettingsStore>()(
	persist(
		(set) => ({
			settings: defaultSettings,
			setSettings: (settings) => {
				set({ settings });
			},
		}),
		{
			name: "settings-storage",
		},
	),
);

const syncSettings = () => {
	settingsNonReactive = { ...useSettingsStore.getState().settings };

	if (useSettingsStore.getState().settings.slowNetwork.enabled) {
		simulateDelay = 5_000;
	}

	if (useSettingsStore.getState().settings.reduceMotion.enabled) {
		motionMultiplier = 0;
	}

	document
		.querySelector("html")!
		.setAttribute(
			"prefer-reduced-motion",
			useSettingsStore.getState().settings.reduceMotion.enabled
				? "true"
				: "false",
		);
};

useSettingsStore.subscribe(syncSettings);
syncSettings();
