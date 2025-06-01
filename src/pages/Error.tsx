import "./Error.scss";

import { BiErrorAlt } from "react-icons/bi";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type PageErrorProps = {
	title?: string;
	description?: string;
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
