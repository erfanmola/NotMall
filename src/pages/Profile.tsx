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
import { useItemsStore } from "../stores/useItemsStore";
import { formatUnixDate } from "../utils/date";
import { ShimmerThumbnail, ShimmerTitle } from "react-shimmer-effects";

const Item: FC<{ item: HistoryItem }> = ({ item }) => {
	if (!item.product) return;

	return (
		<div className="container-item-history">
			<ImageLoader src={item.product.images[0]} />

			<div>
				<span>{item.product.category}</span>
				<h3>{item.product.name}</h3>
			</div>

			<div>
				<span>{formatUnixDate(item.timestamp)}</span>
				<b>
					{item.total.toLocaleString()} {item.currency}
				</b>
			</div>
		</div>
	);
};

const PageProfile = () => {
	const { t } = useTranslation();
	const lp = useLaunchParams();

	const { items, fetchItems, loading: itemsLoading } = useItemsStore();
	const { fetchHistoryItems, historyItems, loading } = useHistoryItemsStore();
	const historyItemsFull = useMemo(() => {
		if (!(items && historyItems)) return null;

		return historyItems.map((historyItem) => {
			const product = items.find((p) => p.id === historyItem.id) ?? {
				id: historyItem.id,
				category: t("general.unknown"),
				name: t("general.unknown"),
				currency: t("general.unknown"),
				description: t("general.unknown"),
				images: ["https://placehold.co/512x512?text=Not+Found"],
				left: 0,
				price: 0,
				tags: {},
			};

			return {
				...historyItem,
				product,
			} satisfies HistoryItem;
		});
	}, [historyItems, items]);

	useEffect(() => {
		if (!historyItems) {
			fetchHistoryItems();
		}

		if (!items) {
			fetchItems();
		}

		invokeHapticFeedbackImpact("medium");
	}, []);

	const renderContent = useMemo(() => {
		if (loading || itemsLoading) {
			return (
				<section id="container-profile-history-shimmer">
					<header>
						<h2>{t("pages.profile.history")}</h2>
					</header>

					<div className="container-items-shimmer-history">
						{Array.from(new Array(10)).map((_, index) => (
							<div className="container-item-shimmer-history" key={index}>
								<ShimmerThumbnail />

								<div>
									<ShimmerTitle line={1} variant="secondary" />
									<ShimmerTitle line={1} variant="primary" />
								</div>

								<div>
									<ShimmerTitle line={1} variant="secondary" />
									<ShimmerTitle line={1} variant="primary" />
								</div>
							</div>
						))}
					</div>
				</section>
			);
		}

		if (!historyItems || !items || !historyItemsFull) {
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
					totalCount={historyItemsFull.length}
					overscan={{
						main: 2,
						reverse: 2,
					}}
					className="container-grid-items-history"
					listClassName="container-items-history"
					itemContent={(index) => <Item item={historyItemsFull[index]} />}
				/>
			</section>
		);
	}, [loading, historyItems, t, itemsLoading, items, historyItemsFull]);

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
