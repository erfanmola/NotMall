import "./scss/tailwind.css";
import "./scss/app.scss";
import "./i18n";

import App from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
