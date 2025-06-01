import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translation as translation_en } from "./i18n/en";

const resources = {
	en: {
		translation: translation_en,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: "en",
	interpolation: {
		escapeValue: false,
	},
});

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "translation";
		resources: {
			translation: typeof translation_en;
		};
	}
}

export default i18n;
