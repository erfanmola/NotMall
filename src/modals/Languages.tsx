import "./Languages.scss";
import {
	memo,
	useMemo,
	type Dispatch,
	type FC,
	type SetStateAction,
} from "react";

import { IoClose } from "react-icons/io5";
import { invokeHapticFeedbackImpact, postEvent } from "../utils/telegram";

import { Drawer } from "vaul";
import { useSettingsStore } from "../stores/useSettingsStore";
import {
	localeFlags,
	locales,
	useTranslation,
	type Locale,
} from "../i18n/i18nProvider";
import { FaCheck } from "react-icons/fa6";

const ModalLanguages: FC<{
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}> = memo(({ isOpen, setOpen }) => {
	const { t, language, setLanguage } = useTranslation();
	const { settings, setSettings } = useSettingsStore();

	const onClickLanguage = (locale: Locale) => {
		invokeHapticFeedbackImpact("medium");
		setSettings({
			...settings,
			language: locale,
		});
		setLanguage(locale);

		postEvent("web_app_open_popup", {
			message: t("modals.settings.sections.reload"),
			title: "",
			buttons: [
				{
					id: "ok",
					type: "ok",
				},
			],
		});
	};

	const renderContent = useMemo(() => {
		return (
			<div className="container-modal-languages">
				<span
					className="btn-close-modal"
					onClick={() => {
						invokeHapticFeedbackImpact("light");
						setOpen(false);
					}}
				>
					<IoClose />
				</span>

				<div>
					<header>
						<h2>{t("modals.settings.sections.language.title")}</h2>
					</header>

					<section>
						<ul>
							{locales.map((locale) => (
								<li onClick={() => onClickLanguage(locale)} key={locale}>
									<span>
										{t(`locales.${locale}`)} {localeFlags[locale]}
									</span>

									{locale === language && (
										<div>
											<FaCheck />
										</div>
									)}
								</li>
							))}
						</ul>
					</section>
				</div>
			</div>
		);
	}, [settings.language, language, t]);

	return (
		<Drawer.Root open={isOpen} onOpenChange={setOpen}>
			<Drawer.Portal>
				<Drawer.Overlay className="vaul-overlay" style={{ zIndex: "10006" }} />
				<Drawer.Content
					className="vaul-content"
					style={{ zIndex: "10006" }}
					aria-describedby={undefined}
				>
					<Drawer.Title style={{ display: "none" }}>
						{t("modals.settings.sections.language.title")}
					</Drawer.Title>

					<div>{renderContent}</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
});

export default ModalLanguages;
