import "./Home.scss";

import {
	IconBasket,
	IconCloseCircle,
	IconSearch,
	IconSearchInput,
} from "../components/Icons";

import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type Dispatch,
	type FC,
	type SetStateAction,
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
import { FaCheck } from "react-icons/fa6";
import LottiePlayer from "../components/LottiePlayer";
import ModalCart from "../modals/Cart";

const Item: FC<{ item: Item }> = ({ item }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLElement>(null);
	const carouselImageRef = useRef<HTMLDivElement>(null);
	const [portal, setPortal] = useState(false);
	const [activeSlide, setActiveSlide] = useState(
		(item.id - 1) % item.images.length,
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

	const onSlideChange = useCallback(
		(swiper: any) => {
			setActiveSlide(swiper.realIndex);
		},
		[setActiveSlide],
	);

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
							loop
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

				{cart[item.id] && (
					<span className="badge-in-cart">
						<FaCheck />
					</span>
				)}
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

const SearchBar: FC<{
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
	setSearch: Dispatch<SetStateAction<boolean>>;
}> = ({ query, setQuery, setSearch }) => {
	const { t } = useTranslation();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!inputRef.current) return;
		inputRef.current.focus();
	}, [inputRef]);

	return (
		<div id="container-searchbar" className="animate__animated animate__fadeIn">
			<label>
				<IconSearchInput />

				<input
					ref={inputRef}
					type="text"
					value={query}
					placeholder={t("general.search")}
					onChange={(e) => {
						setQuery(e.target.value);
					}}
					onKeyUp={(e) => {
						if (e.key === "Enter") {
							(e.target as HTMLInputElement).blur();
						}
					}}
				/>

				{query.length > 0 && (
					<IconCloseCircle
						onClick={() => {
							invokeHapticFeedbackImpact("light");
							setQuery("");
						}}
					/>
				)}
			</label>

			<button
				onClick={() => {
					invokeHapticFeedbackImpact("light");
					setQuery("");
					setSearch(false);
				}}
			>
				{t("general.cancel")}
			</button>
		</div>
	);
};

const PageHome = () => {
	const { t } = useTranslation();
	const { items, loading, fetchItems } = useItemsStore();
	const { cart } = useCartStore();
	const [modalCart, setModalCart] = useState(false);
	const [search, setSearch] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const itemsList = useMemo(() => {
		if (!items) return items;

		if (search && searchQuery.length > 0) {
			return items.filter(
				(item) =>
					item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 ||
					item.description.toLowerCase().indexOf(searchQuery.toLowerCase()) >
						-1 ||
					item.category.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1,
			);
		}

		return items;
	}, [items, searchQuery, searchQuery]);

	const onClickButtonSearch = useCallback(() => {
		invokeHapticFeedbackImpact("light");
		setSearch(true);
	}, []);

	const onClickButtonCart = useCallback(() => {
		if (!items) return;
		invokeHapticFeedbackImpact("light");
		setModalCart(true);
	}, [items]);

	const totalPrice = useMemo(() => {
		if (!items) return 0;
		return items.reduce(
			(prev, curr) => prev + curr.price * (cart[curr.id] ?? 0),
			0,
		);
	}, [cart, items]);

	const onClickButtonBuy = useCallback(() => {
		// TODO: Implement this
		console.log("Ok");
	}, []);

	useEffect(() => {
		if (!items) {
			fetchItems();
		}

		invokeHapticFeedbackImpact("medium");
	}, []);

	const renderHeader = useMemo(() => {
		if (search) {
			return (
				<SearchBar
					query={searchQuery}
					setQuery={setSearchQuery}
					setSearch={setSearch}
				/>
			);
		}

		return (
			<header className="animate__animated animate__fadeIn">
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
		);
	}, [search, searchQuery, cart]);

	const renderContent = useMemo(() => {
		if (loading) {
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
		}

		if (itemsList) {
			if (itemsList.length === 0) {
				return (
					<div className="container-grid-items-home-not-found">
						<LottiePlayer src="/assets/lottie/chick.json" autoplay />
						<h2>
							{search
								? t("pages.home.search.notFound.title")
								: t("pages.home.notFound.title")}
						</h2>
						<span>
							{search
								? t("pages.home.search.notFound.description")
								: t("pages.home.notFound.description")}
						</span>
					</div>
				);
			}

			// if (items.length <= 12) {
			// 	return (
			// 		<div className="container-grid-items-home">
			// 			<div className="container-items-home">
			// 				{items.map((item, index) => (
			// 					<Item item={item} key={index} />
			// 				))}
			// 			</div>
			// 		</div>
			// 	);
			// } else {
			return (
				<VirtuosoGrid
					totalCount={itemsList.length}
					overscan={{
						main: 2,
						reverse: 2,
					}}
					className="container-grid-items-home"
					listClassName="container-items-home"
					itemContent={(index) => <Item item={itemsList[index]} />}
				/>
			);
			// }
		}

		// TODO: implement this
		return <>Ooops</>;
	}, [loading, itemsList, search]);

	const renderBuyButton = useMemo(() => {
		if (items && Object.keys(cart).length > 0) {
			return (
				<div id="container-action-buttons" className="container-buy-button">
					<div className="primary" onClick={onClickButtonBuy}>
						<span>
							{t("pages.product.buyFor", {
								price: totalPrice.toLocaleString(),
								currency: "NOT",
							})}
						</span>
					</div>
				</div>
			);
		}
	}, [cart, items, totalPrice]);

	return (
		<>
			<div id="container-page-home">
				<>{renderHeader}</>

				<section>
					<>{renderContent}</>
				</section>

				<BottomBar />

				<>{renderBuyButton}</>
			</div>

			<ModalCart isOpen={modalCart} setOpen={setModalCart} />
		</>
	);
};

export default PageHome;
