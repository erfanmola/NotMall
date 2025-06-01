import {
	bindMiniAppCssVars,
	bindThemeParamsCssVars,
	bindViewportCssVars,
	init,
	isTMA,
	miniApp,
	themeParams,
	useLaunchParams,
	viewport,
} from "@telegram-apps/sdk-react";
import {
	invokeHapticFeedbackImpact,
	isVersionAtLeast,
	postEvent,
} from "./utils/telegram";

import PageError from "./pages/Error";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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

			if (isVersionAtLeast("6.1", lp.tgWebAppVersion)) {
				postEvent("web_app_setup_settings_button", {
					is_visible: false,
				});

				// TODO: open settings modal
				// on("settings_button_pressed", () => {
				// });
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

			invokeHapticFeedbackImpact("heavy");
		};

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

		return <RouterProvider router={router} />;
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
