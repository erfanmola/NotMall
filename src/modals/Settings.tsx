import "./Settings.scss";
import {
	useMemo,
	useState,
	type Dispatch,
	type FC,
	type SetStateAction,
} from "react";

import { IoClose } from "react-icons/io5";
import { invokeHapticFeedbackImpact, postEvent } from "../utils/telegram";

import { Drawer } from "vaul";
import Switch from "../components/Switch";
import { useSettingsStore } from "../stores/useSettingsStore";
import { localeFlags, useTranslation } from "../i18n/i18nProvider";
import ModalLanguages from "./Languages";
import PaymentOverlay from "../components/PaymentOverlay";

const ModalSettings: FC<{
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setOpen }) => {
	const { t, language } = useTranslation();
	const { settings, setSettings } = useSettingsStore();
	const [languagesModal, setLanguagesModal] = useState(false);

	const [paymentOverlay, setPaymentOverlay] = useState<
		"success" | "failed" | undefined
	>(undefined);

	const renderPaymentOverlay = useMemo(() => {
		if (!paymentOverlay) return;
		return (
			<PaymentOverlay status={paymentOverlay} setStatus={setPaymentOverlay} />
		);
	}, [paymentOverlay]);

	const renderContent = useMemo(() => {
		return (
			<div className="container-modal-settings">
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
						<h2>{t("modals.settings.title")}</h2>
					</header>

					<section>
						<div>
							<span>{t("modals.settings.sections.language.title")}</span>

							<div>
								<span onClick={() => setLanguagesModal(true)}>
									{t(`locales.${language}`)} {localeFlags[language]}
								</span>
							</div>
						</div>

						<div>
							<span>{t("modals.settings.sections.vibration.title")}</span>

							<div>
								<Switch
									checked={settings.haptics.enabled}
									onChange={(value) => {
										invokeHapticFeedbackImpact("light");

										setSettings({
											...settings,
											haptics: {
												enabled: value,
											},
										});
									}}
								/>
							</div>
						</div>

						<div>
							<span>{t("modals.settings.sections.motion.title")}</span>

							<div>
								<Switch
									checked={settings.reduceMotion.enabled}
									onChange={(value) => {
										invokeHapticFeedbackImpact("light");

										setSettings({
											...settings,
											reduceMotion: {
												enabled: value,
											},
										});
									}}
								/>
							</div>
						</div>

						<div>
							<span>{t("modals.settings.sections.delay.title")}</span>

							<div>
								<Switch
									checked={settings.slowNetwork.enabled}
									onChange={(value) => {
										invokeHapticFeedbackImpact("light");

										setSettings({
											...settings,
											slowNetwork: {
												enabled: value,
											},
										});

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
									}}
								/>
							</div>
						</div>

						<div>
							<span>{t("modals.settings.sections.empty.title")}</span>

							<div>
								<Switch
									checked={settings.emptyItems.enabled}
									onChange={(value) => {
										invokeHapticFeedbackImpact("light");

										setSettings({
											...settings,
											emptyItems: {
												enabled: value,
											},
										});
									}}
								/>
							</div>
						</div>

						<div
							onClick={() => {
								setOpen(false);
								setPaymentOverlay("success");
							}}
						>
							<span>{t("modals.settings.sections.payment.title")}</span>
						</div>
					</section>
				</div>
			</div>
		);
	}, [settings, t]);

	return (
		<>
			<Drawer.Root open={isOpen} onOpenChange={setOpen}>
				<Drawer.Portal>
					<Drawer.Overlay className="vaul-overlay" />
					<Drawer.Content
						className="vaul-content"
						style={{ zIndex: "10005" }}
						aria-describedby={undefined}
					>
						<Drawer.Title style={{ display: "none" }}>
							{t("modals.settings.title")}
						</Drawer.Title>

						<div>{renderContent}</div>
					</Drawer.Content>
				</Drawer.Portal>
			</Drawer.Root>

			<ModalLanguages isOpen={languagesModal} setOpen={setLanguagesModal} />

			<>{renderPaymentOverlay}</>
		</>
	);
};

export default ModalSettings;
