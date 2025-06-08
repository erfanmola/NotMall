import "./BottomBar.scss";

import { memo, type FC } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IconNotcoinCircle } from "./Icons";
import ImageLoader from "./ImageLoader";
import { NavLink } from "react-router";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useTranslation } from "../i18n/i18nProvider";

const BottomBar: FC = memo(() => {
	const { t } = useTranslation();
	const lp = useLaunchParams();

	return (
		<div id="container-bottom-bar">
			<div>
				<NavLink to="/">
					<div>
						<IconNotcoinCircle />
					</div>
					<span>{t("bottombar.store")}</span>
				</NavLink>

				<NavLink to="/profile">
					<div>
						{lp.tgWebAppData?.user?.photo_url ? (
							<ImageLoader src={lp.tgWebAppData.user.photo_url} />
						) : (
							<FaCircleUser />
						)}
					</div>
					<span>{lp.tgWebAppData?.user?.first_name}</span>
				</NavLink>
			</div>
		</div>
	);
});

export default BottomBar;
