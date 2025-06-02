import "./Home.scss";

import { IconBasket, IconSearch } from "../components/Icons";

import type { FC } from "react";
import type { Item } from "../stores/useItemsStore";
import { useLoadItems } from "../hooks/useLoadItems";
import { useTranslation } from "react-i18next";
import ImageLoader from "../components/ImageLoader";
import { Link } from "react-router";
import { ShimmerThumbnail, ShimmerTitle } from "react-shimmer-effects";

const Item: FC<{ item: Item }> = ({ item }) => {
	return (
		<Link to={"/"} className="container-item-home">
			<header>
				<ImageLoader src={item.images[0]} />
			</header>

			<div>
				<h2>{item.name}</h2>
				<div>
					{item.price.toLocaleString()} <span>{item.currency}</span>
				</div>
			</div>
		</Link>
	);
};

const Items: FC<{ items: Item[] }> = ({ items }) => {
	return items.map((item) => <Item item={item} key={item.id} />);
};

const ItemsSkeleton = () => {
	return Array.from(new Array(6)).map((_, index) => (
		<div className="container-item-shimmer-home" key={index}>
			<ShimmerThumbnail />

			<div>
				<ShimmerTitle line={1} variant="primary" />
				<ShimmerTitle line={1} variant="secondary" />
			</div>
		</div>
	));
};

const ItemsError = () => {
	// TODO: implement this
	return <>Ooops</>;
};

const PageHome = () => {
	const { t } = useTranslation();
	const { items, loading } = useLoadItems();

	return (
		<div id="container-page-home">
			<header>
				<h1>{t("general.title")}</h1>

				<div>
					<IconSearch />
					<IconBasket />
				</div>
			</header>

			<section>
				{loading ? (
					<ItemsSkeleton />
				) : items ? (
					<Items items={items} />
				) : (
					<ItemsError />
				)}
			</section>
		</div>
	);
};

export default PageHome;
