import "./Error.scss";

import { BiErrorAlt } from "react-icons/bi";
import { useEffect, type FC } from "react";
import { PiAlienLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { invokeHapticFeedbackNotification } from "../utils/telegram";

type PageErrorProps = {
	title?: string;
	description?: string;
};

export const SectionError: FC<PageErrorProps> = ({ title, description }) => {
	const { t } = useTranslation();

	useEffect(() => {
		invokeHapticFeedbackNotification("error");
	}, []);

	return (
		<div id="container-section-error">
			<PiAlienLight className="animate__animated animate__fadeInUp" />
			<h1 className="animate__animated animate__fadeInUp">
				{title ?? t("pages.error.title")}
			</h1>
			<p className="animate__animated animate__fadeInUp">
				{description ?? t("pages.error.description")}
			</p>
		</div>
	);
};

const PageError: FC<PageErrorProps> = ({ title, description }) => {
	const { t } = useTranslation();

	return (
		<div id="container-page-error">
			<BiErrorAlt className="animate__animated animate__fadeInUp" />
			<h1 className="animate__animated animate__fadeInUp">
				{title ?? t("pages.error.title")}
			</h1>
			<p className="animate__animated animate__fadeInUp">
				{description ?? t("pages.error.description")}
			</p>
		</div>
	);
};

export default PageError;
