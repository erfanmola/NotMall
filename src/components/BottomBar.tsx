import "./BottomBar.scss";

import type { FC } from "react";
import { NavLink } from "react-router";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";

const BottomBar: FC = () => {
	const { t } = useTranslation();
	const lp = useLaunchParams();

	return (
		<div id="container-bottom-bar">
			<div>
				<NavLink to="/">
					<div>Icon</div>
					<span>{t("bottombar.store")}</span>
				</NavLink>

				<NavLink to="/profile">
					<div>Icon</div>
					<span>{lp.tgWebAppData?.user?.first_name}</span>
				</NavLink>
			</div>
		</div>
	);
};

export default BottomBar;
