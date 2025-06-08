import {
	bindMiniAppCssVars,
	bindThemeParamsCssVars,
	bindViewportCssVars,
	init,
	isTMA,
	miniApp,
	on,
	themeParams,
	useLaunchParams,
	viewport,
} from "@telegram-apps/sdk-react";
import { isVersionAtLeast, postEvent } from "./utils/telegram";
import { useEffect, useState } from "react";

import { Flip } from "gsap/all";
import ModalSettings from "./modals/Settings";
import PageError from "./pages/Error";
import { RouterProvider } from "react-router";
import gsap from "gsap";
import { preloadLottieAnimations } from "./utils/preload";
import { router } from "./router";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "./i18n/i18nProvider";

const handleTheme = (isDark: boolean) => {
	document.body.setAttribute("data-theme", isDark ? "dark" : "light");

	postEvent("web_app_set_header_color", {
		color: isDark ? "#000000" : "#ffffff",
	});

	postEvent("web_app_set_background_color", {
		color: isDark ? "#000000" : "#ffffff",
	});

	postEvent("web_app_set_bottom_bar_color", {
		color: isDark ? "#000000" : "#ffffff",
	});
};

const App = () => {
	const [settingsModal, setSettingsModal] = useState(false);

	if (isTMA()) {
		init();
		const lp = useLaunchParams();

		const initializeTMA = async () => {
			postEvent("web_app_ready");
			postEvent("iframe_ready");
			postEvent("web_app_expand");

			postEvent("web_app_setup_back_button", {
				is_visible: false,
			});

			postEvent("web_app_setup_main_button", {
				is_visible: false,
			});

			postEvent("web_app_setup_secondary_button", {
				is_visible: false,
			});

			postEvent("web_app_setup_settings_button", {
				is_visible: false,
			});

			if (
				viewport.mount.isAvailable() &&
				!(viewport.isMounted() || viewport.isMounting())
			) {
				await viewport.mount();
				bindViewportCssVars();
			}

			if (miniApp.mountSync.isAvailable() && !miniApp.isMounted()) {
				miniApp.mountSync();
				bindMiniAppCssVars();

				handleTheme(miniApp.isDark());
				miniApp.isDark.sub(handleTheme);
			}

			if (themeParams.mountSync.isAvailable() && !miniApp.isMounted()) {
				themeParams.mountSync();
				bindThemeParamsCssVars();
			}

			setTimeout(() => {
				const persistVariables = [
					"tg-viewport-height",
					"tg-viewport-safe-area-inset-top",
					"tg-viewport-content-safe-area-inset-top",
					"tg-viewport-safe-area-inset-bottom",
					"tg-viewport-content-safe-area-inset-bottom",
				];

				for (const name of persistVariables) {
					(document.querySelector(":root") as HTMLElement).style.setProperty(
						`--p${name}`,
						(
							document.querySelector(":root") as HTMLElement
						).style.getPropertyValue(`--${name}`),
					);
				}
			});

			if (isVersionAtLeast("6.1", lp.tgWebAppVersion)) {
				postEvent("web_app_setup_settings_button", {
					is_visible: true,
				});

				on("settings_button_pressed", () => {
					setSettingsModal(true);
				});
			}

			if (isVersionAtLeast("6.2", lp.tgWebAppVersion)) {
				postEvent("web_app_setup_closing_behavior", {
					need_confirmation: false,
				});
			}

			if (isVersionAtLeast("7.7", lp.tgWebAppVersion)) {
				postEvent("web_app_setup_swipe_behavior", {
					allow_vertical_swipe: false,
				});
			}

			if (isVersionAtLeast("8.0", lp.tgWebAppVersion)) {
				postEvent("web_app_toggle_orientation_lock", {
					locked: true,
				});

				if (["ios", "android"].includes(lp.tgWebAppPlatform.toLowerCase())) {
					postEvent("web_app_request_fullscreen");
				}
			}
		};

		gsap.registerPlugin(useGSAP, Flip);

		useEffect(() => {
			initializeTMA();

			document.addEventListener("contextmenu", (event) => {
				event.preventDefault();
			});

			return () => {
				if (viewport.isMounted()) {
					viewport.unmount();
				}

				if (miniApp.isMounted()) {
					miniApp.unmount();
					miniApp.isDark.unsubAll();
				}

				if (themeParams.isMounted()) {
					themeParams.unmount();
				}
			};
		}, []);

		setTimeout(() => {
			preloadLottieAnimations();
			import("@tonconnect/ui");
		}, 5e3);

		return (
			<>
				<RouterProvider router={router} />
				<ModalSettings isOpen={settingsModal} setOpen={setSettingsModal} />
			</>
		);
	}

	const { t } = useTranslation();

	return (
		<PageError
			title={t("pages.errorInvalidEnv.title")}
			description={t("pages.errorInvalidEnv.description")}
		/>
	);
};

export default App;
