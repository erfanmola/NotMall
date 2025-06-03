import "./Home.scss";

import { IconBasket, IconSearch } from "../components/Icons";

import { useEffect, useRef, useState, type FC } from "react";
import { useItemsStore, type Item } from "../stores/useItemsStore";
import { useTranslation } from "react-i18next";
import ImageLoader from "../components/ImageLoader";
import { Link } from "react-router";
import { ShimmerThumbnail, ShimmerTitle } from "react-shimmer-effects";
import { invokeHapticFeedbackImpact } from "../utils/telegram";
import { VirtuosoGrid } from "react-virtuoso";
import ReactSimplyCarousel from "react-simply-carousel";

const Item: FC<{ item: Item }> = ({ item }) => {
	const headerRef = useRef<HTMLElement>(null);
	const [headerSize, setHeaderSize] = useState(0);
	const [activeSlide, setActiveSlide] = useState(
		Math.floor(Math.random() * item.images.length),
	);

	useEffect(() => {
		if (!headerRef.current) return;
		setHeaderSize(headerRef.current.clientWidth);
	}, [headerRef]);

	return (
		<Link to={"/"} className="container-item-home">
			<header ref={headerRef}>
				{headerSize && (
					<>
						<ReactSimplyCarousel
							activeSlideIndex={activeSlide}
							onRequestChange={setActiveSlide}
							itemsToShow={1}
							itemsToScroll={1}
							speed={250}
							easing="linear"
							centerMode
							infinite
						>
							{item.images.map((image, index) => (
								<div
									key={index}
									style={{ width: headerSize, height: headerSize }}
								>
									<ImageLoader src={image} />
								</div>
							))}
						</ReactSimplyCarousel>

						<ul>
							{item.images.map((_, index) => (
								<li
									key={index}
									className={index === activeSlide ? "active" : ""}
								></li>
							))}
						</ul>
					</>
				)}
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
	if (items.length <= 12) {
		return (
			<div className="container-grid-items-home">
				<div className="container-items-home">
					{items.map((item, index) => (
						<Item item={item} key={index} />
					))}
				</div>
			</div>
		);
	} else {
		return (
			<VirtuosoGrid
				totalCount={items.length}
				overscan={{
					main: 2,
					reverse: 2,
				}}
				className="container-grid-items-home"
				listClassName="container-items-home"
				itemContent={(index) => <Item item={items[index]} />}
			/>
		);
	}
};

const ItemsSkeleton = () => {
	return (
		<div id="container-items-shimmer-home">
			{Array.from(new Array(6)).map((_, index) => (
				<div className="container-item-shimmer-home" key={index}>
					<ShimmerThumbnail />

					<div>
						<ShimmerTitle line={1} variant="primary" />
						<ShimmerTitle line={1} variant="secondary" />
					</div>
				</div>
			))}
		</div>
	);
};

const ItemsError = () => {
	// TODO: implement this
	return <>Ooops</>;
};

const PageHome = () => {
	const { t } = useTranslation();
	const { items, loading, fetchItems } = useItemsStore();

	useEffect(() => {
		if (!items) {
			fetchItems();
		}

		invokeHapticFeedbackImpact("medium");
	}, []);

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
