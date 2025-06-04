import "./Profile.scss";

import BottomBar from "../components/BottomBar";
import { invokeHapticFeedbackImpact } from "../utils/telegram";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const PageProfile = () => {
	const { t } = useTranslation();

	useEffect(() => {
		invokeHapticFeedbackImpact("medium");
	}, []);

	return (
		<div id="container-page-profile">
			<header>
				<h1>{t("general.title")}</h1>
			</header>

			<BottomBar />
		</div>
	);
};

export default PageProfile;
