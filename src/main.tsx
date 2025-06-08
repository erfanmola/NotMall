import "./scss/tailwind.css";
import "./scss/app.scss";

import App from "./App";
import { I18nProvider } from "./i18n/i18nProvider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<I18nProvider>
			<App />
		</I18nProvider>
	</StrictMode>,
);
