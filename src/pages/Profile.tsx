import "./Profile.scss";

import { useEffect, useMemo, type FC } from "react";

import BottomBar from "../components/BottomBar";
import { FaCircleUser } from "react-icons/fa6";
import ImageLoader from "../components/ImageLoader";
import { invokeHapticFeedbackImpact } from "../utils/telegram";
import {
	useHistoryItemsStore,
	type HistoryItem,
} from "../stores/useHistoryStore";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { VirtuosoGrid } from "react-virtuoso";

const Item: FC<{ item: HistoryItem }> = ({ item }) => {
	return (
		<div className="container-item-history">
			{item.id}
			{/* <ImageLoader
					src={item.images[0]}
				/> */}
		</div>
	);
};

const PageProfile = () => {
	const { t } = useTranslation();
	const lp = useLaunchParams();

	const { fetchHistoryItems, historyItems, loading } = useHistoryItemsStore();

	useEffect(() => {
		if (!historyItems) {
			fetchHistoryItems();
		}

		invokeHapticFeedbackImpact("medium");
	}, []);

	const renderContent = useMemo(() => {
		if (loading) {
			return (
				<section id="container-profile-history-shimmer">
					<header>
						<h2>{t("pages.profile.history")}</h2>
					</header>

					<div>Loading...</div>
				</section>
			);
		}

		if (!historyItems) {
			return <section>Error</section>;
		}

		if (historyItems.length === 0) {
			return (
				<section id="container-profile-history-empty">
					<h2>{t("pages.profile.noHistory.title")}</h2>
					<span>{t("pages.profile.noHistory.description")}</span>
				</section>
			);
		}

		return (
			<section id="container-profile-history">
				<header>
					<h2>{t("pages.profile.history")}</h2>
				</header>

				<VirtuosoGrid
					totalCount={historyItems.length}
					overscan={{
						main: 2,
						reverse: 2,
					}}
					className="container-grid-items-history"
					listClassName="container-items-history"
					itemContent={(index) => <Item item={historyItems[index]} />}
				/>
			</section>
		);
	}, [loading, historyItems, t]);

	return (
		<div id="container-page-profile">
			<section>
				<div>
					<div>
						{lp.tgWebAppData?.user?.photo_url ? (
							<ImageLoader src={lp.tgWebAppData.user.photo_url} />
						) : (
							<FaCircleUser />
						)}
					</div>

					<h1>{lp.tgWebAppData?.user?.first_name}</h1>
				</div>

				{renderContent}
			</section>

			<BottomBar />
		</div>
	);
};

export default PageProfile;
