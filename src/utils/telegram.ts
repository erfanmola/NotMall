import {
	type ImpactHapticFeedbackStyle,
	type NotificationHapticFeedbackType,
	postEvent as postEventUnsafe,
	useLaunchParams,
} from "@telegram-apps/sdk-react";
import { settingsNonReactive } from "../stores/useSettingsStore";

export const invokeHapticFeedbackImpact = (
	style: ImpactHapticFeedbackStyle,
) => {
	if (!settingsNonReactive.haptics.enabled) return;

	postEvent("web_app_trigger_haptic_feedback", {
		type: "impact",
		impact_style: style,
	});
};

export const invokeHapticFeedbackNotification = (
	style: NotificationHapticFeedbackType,
) => {
	if (!settingsNonReactive.haptics.enabled) return;

	postEvent("web_app_trigger_haptic_feedback", {
		type: "notification",
		notification_type: style,
	});
};

export const invokeHapticFeedbackSelectionChanged = () => {
	if (!settingsNonReactive.haptics.enabled) return;

	postEvent("web_app_trigger_haptic_feedback", {
		type: "selection_change",
	});
};

export const isVersionAtLeast = (version: string, current?: string) => {
	const v1 = (current ?? useLaunchParams().tgWebAppVersion ?? "0")
		.replace(/^\s+|\s+$/g, "")
		.split(".");
	const v2 = version.replace(/^\s+|\s+$/g, "").split(".");
	const a = Math.max(v1.length, v2.length);
	let p1: number | undefined;
	let p2: number | undefined;
	for (let i = 0; i < a; i++) {
		p1 = Number.parseInt(v1[i]) || 0;
		p2 = Number.parseInt(v2[i]) || 0;
		if (p1 === p2) continue;
		if (p1 > p2) return true;
		return false;
	}
	return true;
};

export const postEvent = (...args: Parameters<typeof postEventUnsafe<any>>) => {
	try {
		postEventUnsafe(...args);
	} catch (e) {}
};
