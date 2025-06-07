import {
	createContext,
	useContext,
	useState,
	useMemo,
	type ReactNode,
	useEffect,
} from "react";
import { translation as en } from "../lang/en";
import { translation as ar } from "../lang/ar";
import { translation as de } from "../lang/de";
import { translation as es } from "../lang/es";
import { translation as fa } from "../lang/fa";
import { translation as hi } from "../lang/hi";
import { translation as ru } from "../lang/ru";
import { translation as zh } from "../lang/zh";

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;
type NestedKeyOf<ObjectType extends object> = {
	[Key in keyof ObjectType & string]: ObjectType[Key] extends object
		? // @ts-ignore
			`${Key}${DotPrefix<NestedKeyOf<ObjectType[Key]>>}`
		: Key;
}[keyof ObjectType & string];

type TranslationKeys = NestedKeyOf<typeof en>;

interface I18nContextProps {
	t: (path: TranslationKeys, vars?: Record<string, string | number>) => string;
	language: Lang;
	setLanguage: (lang: Lang) => void;
}

export const locales = [
	"en",
	"ru",
	"fa",
	"ar",
	"es",
	"de",
	"hi",
	"zh",
] as const;

export const localeFlags: { [key in Locale]: string } = {
	en: "🇺🇸",
	fa: "🇮🇷",
	ru: "🇷🇺",
	ar: "🇦🇪",
	es: "🇪🇸",
	de: "🇩🇪",
	hi: "🇮🇳",
	zh: "🇨🇳",
};

export const localeDirections: { [key in Locale]: string } = {
	en: "ltr",
	fa: "rtl",
	ru: "ltr",
	ar: "rtl",
	es: "ltr",
	de: "ltr",
	hi: "ltr",
	zh: "ltr",
};

import { getNestedValue, interpolate } from "./utils";
import { useSettingsStore } from "../stores/useSettingsStore";

const allTranslations = {
	en,
	ar,
	de,
	es,
	fa,
	hi,
	ru,
	zh,
};

export type Lang = keyof typeof allTranslations;

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
	const { settings } = useSettingsStore();
	const [language, setLanguage] = useState<Lang>(settings.language ?? "en");

	const t = (path: string, vars?: Record<string, string | number>): string => {
		const langPack = allTranslations[language];
		const value = getNestedValue(langPack, path);
		return value ? interpolate(value, vars) : path;
	};

	const value = useMemo(() => ({ t, language, setLanguage }), [language]);

	useEffect(() => {
		document
			.querySelector("html")
			?.setAttribute("dir", localeDirections[language]);
	}, [language]);

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => {
	const context = useContext(I18nContext);
	if (!context)
		throw new Error("useTranslation must be used within I18nProvider");
	return context;
};

export type Locale = (typeof locales)[number];
