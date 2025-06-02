import "./Profile.scss";

import { useTranslation } from "react-i18next";

const PageProfile = () => {
	const { t } = useTranslation();

	return (
		<div id="container-page-profile">
			<header>
				<h1>{t("general.title")}</h1>
			</header>
		</div>
	);
};

export default PageProfile;
