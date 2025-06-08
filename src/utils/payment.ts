import type { TonConnectUI } from "@tonconnect/ui";

let tonConnectUI: TonConnectUI | undefined;

const initializeTonConnect = async () => {
	if (tonConnectUI) return;

	try {
		const { THEME, TonConnectUI } = await import("@tonconnect/ui");
		const darkMode = document.body.getAttribute("data-theme") === "dark";

		tonConnectUI = new TonConnectUI({
			manifestUrl: "https://notmall.developex.ir/tonconnect-manifest.json",
			uiPreferences: {
				theme: darkMode ? THEME.DARK : THEME.LIGHT,
			},
		});
	} catch (error) {
		console.error("Failed to initialize TonConnectUI:", error);
	}
};

export const handlePayment = async (amount = 10_000) => {
	await initializeTonConnect();
	if (!tonConnectUI) return;

	await tonConnectUI.connectionRestored;

	if (!tonConnectUI.connected) {
		await tonConnectUI.openModal();
		return undefined;
	}

	try {
		await tonConnectUI.sendTransaction({
			validUntil: Math.floor(Date.now() / 1000) + 360,
			messages: [
				{
					address: import.meta.env.VITE_DESTINATION_WALLET,
					amount: (
						amount *
						1e9 *
						Number.parseFloat(import.meta.env.VITE_NOT_RATIO ?? "1")
					).toString(),
					payload: "8===D",
				},
			],
		});

		return true;
	} catch (err) {
		return false;
	}
};
