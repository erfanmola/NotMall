import "./Home.scss";

import { IconBasket, IconSearch } from "../components/Icons";

import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type FC,
} from "react";
import { useItemsStore, type Item } from "../stores/useItemsStore";
import { useTranslation } from "react-i18next";
import ImageLoader from "../components/ImageLoader";
import { ShimmerThumbnail, ShimmerTitle } from "react-shimmer-effects";
import { invokeHapticFeedbackImpact } from "../utils/telegram";
import { VirtuosoGrid } from "react-virtuoso";
import { Swiper, SwiperSlide } from "swiper/react";
import { createPortal } from "react-dom";
import { Product } from "./Product";
import { Flip } from "gsap/all";
import { motionMultiplier } from "../stores/useSettingsStore";
import BottomBar from "../components/BottomBar";
import { Pagination } from "swiper/modules";
import { useCartStore } from "../stores/useCartStore";

const Item: FC<{ item: Item }> = ({ item }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLElement>(null);
	const carouselImageRef = useRef<HTMLDivElement>(null);
	const [portal, setPortal] = useState(false);
	const [activeSlide, setActiveSlide] = useState(
		Math.floor(Math.random() * item.images.length),
	);
	const { cart } = useCartStore();

	const onClickProduct = useCallback(() => {
		setPortal(true);

		setTimeout(() => {
			const containerProductCarousel = document.querySelector(
				"#container-product #container-image-product",
			);

			if (
				!(
					containerProductCarousel &&
					carouselImageRef.current &&
					headerRef.current
				)
			)
				return;
			carouselImageRef.current.classList.add("visible");
			containerRef.current
				?.querySelector(".badge-in-cart")
				?.classList.add("invisible");
			headerRef.current.classList.add("invisible");

			const flipState = Flip.getState(carouselImageRef.current);
			containerProductCarousel?.appendChild(carouselImageRef.current);
			Flip.from(flipState, {
				duration: 0.25 * motionMultiplier,
				ease: "none",
			});
		});
	}, []);

	const onCloseProduct = useCallback(() => {
		if (!carouselImageRef.current) return;

		const flipState = Flip.getState(carouselImageRef.current);
		containerRef.current?.appendChild(carouselImageRef.current);

		Flip.from(flipState, {
			duration: 0.25 * motionMultiplier,
			ease: "none",
		}).then(() => {
			if (!(carouselImageRef.current && headerRef.current)) return;
			headerRef.current.classList.remove("invisible");
			containerRef.current
				?.querySelector(".badge-in-cart")
				?.classList.remove("invisible");
			carouselImageRef.current.classList.remove("visible");
		});

		setPortal(false);
	}, []);

	const onSlideChange = useCallback((swiper: any) => {
		setActiveSlide(swiper.activeIndex);
	}, []);

	return (
		<>
			<div
				className="container-item-home"
				ref={containerRef}
				onClick={onClickProduct}
			>
				<ImageLoader
					ref={carouselImageRef}
					src={item.images[activeSlide]}
					containerAttrs={{ style: { pointerEvents: "none" } }}
				/>

				<header ref={headerRef}>
					{!portal && (
						<Swiper
							pagination={true}
							modules={[Pagination]}
							initialSlide={activeSlide}
							onSlideChange={onSlideChange}
						>
							{item.images.map((image, index) => (
								<SwiperSlide key={index}>
									<ImageLoader src={image} />
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</header>

				<div>
					<h2>{item.name}</h2>
					<div>
						{item.price.toLocaleString()} <span>{item.currency}</span>
					</div>
				</div>

				{cart[item.id] && <span className="badge-in-cart">✓</span>}
			</div>

			{portal &&
				createPortal(
					<Product
						item={item}
						onClose={onCloseProduct}
						activeSlideState={[activeSlide, setActiveSlide]}
					/>,
					document.querySelector("#root > main")!,
				)}
		</>
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

const ItemsShimmer = () => {
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
	const { cart } = useCartStore();

	const onClickButtonBuy = useCallback(() => {
		// TODO: Implement this
		console.log("Ok");
	}, []);

	const onClickButtonSearch = useCallback(() => {
		// TODO: Implement this
		console.log("Ok");
	}, []);

	const onClickButtonCart = useCallback(() => {
		// TODO: Implement this
		console.log("Ok");
	}, []);

	const totalPrice = useMemo(() => {
		if (!items) return 0;
		return items.reduce(
			(prev, curr) => prev + curr.price * (cart[curr.id] ?? 0),
			0,
		);
	}, [cart, items]);

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
					<div onClick={onClickButtonSearch}>
						<IconSearch />
					</div>

					<div onClick={onClickButtonCart}>
						{Object.keys(cart).length > 0 ? (
							<span>{Object.keys(cart).length}</span>
						) : (
							<IconBasket />
						)}
					</div>
				</div>
			</header>

			<section>
				{loading ? (
					<ItemsShimmer />
				) : items ? (
					<Items items={items} />
				) : (
					<ItemsError />
				)}
			</section>

			{Object.keys(cart).length > 0 ? (
				<div id="container-action-buttons" style={{ paddingTop: "0" }}>
					<div className="primary" onClick={onClickButtonBuy}>
						<span>
							{t("pages.product.buyFor", {
								price: totalPrice.toLocaleString(),
								currency: "NOT",
							})}
						</span>
					</div>
				</div>
			) : (
				<BottomBar />
			)}
		</div>
	);
};

export default PageHome;
