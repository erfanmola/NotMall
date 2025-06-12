import "./Home.scss";

import {
	IconBasket,
	IconCloseCircle,
	IconSearch,
	IconSearchInput,
} from "../components/Icons";

import {
	memo,
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
import ImageLoader from "../components/ImageLoader";
import { ShimmerThumbnail, ShimmerTitle } from "react-shimmer-effects";
import { invokeHapticFeedbackImpact } from "../utils/telegram";
import { VirtuosoGrid } from "react-virtuoso";
import { Swiper, SwiperSlide } from "swiper/react";
import { createPortal } from "react-dom";
import { Product } from "./Product";
import { Flip } from "gsap/all";
import { motionMultiplier, useSettingsStore } from "../stores/useSettingsStore";
import BottomBar from "../components/BottomBar";
import { Pagination } from "swiper/modules";
import { useCartStore } from "../stores/useCartStore";
import { FaCheck, FaExclamation } from "react-icons/fa6";
import LottiePlayer from "../components/LottiePlayer";
import ModalCart from "../modals/Cart";
import { SectionError } from "./Error";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useNavigate } from "react-router";
import { useTranslation } from "../i18n/i18nProvider";
import { lottieAnimations } from "../utils/lottie";
import { handlePayment } from "../utils/payment";
import PaymentOverlay from "../components/PaymentOverlay";
import { useLongPress } from "use-long-press";

const Item: FC<{ item: Item }> = memo(({ item }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLElement>(null);
	const carouselImageRef = useRef<HTMLDivElement>(null);
	const [portal, setPortal] = useState(false);
	const [activeSlide, setActiveSlide] = useState(
		(item.id - 1) % item.images.length,
	);
	const { cart, remove, increment } = useCartStore();
	const [clickEvent, setClickEvent] = useState(true);

	const onClickProduct = () => {
		if (!clickEvent) return;
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
				duration: 0.325 * motionMultiplier,
				ease: "circ",
			});
		});
	};

	const onCloseProduct = useCallback(() => {
		if (!carouselImageRef.current) return;

		const flipState = Flip.getState(carouselImageRef.current);
		containerRef.current?.appendChild(carouselImageRef.current);

		Flip.from(flipState, {
			duration: 0.325 * motionMultiplier,
			ease: "circ",
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

	const longPressHandlers = useLongPress(
		() => {
			setClickEvent(false);
			invokeHapticFeedbackImpact("medium");
			if (item.left === 0) return;
			if (item.id in cart) {
				remove(item.id.toString());
			} else {
				increment(item.id.toString());
			}
		},
		{
			cancelOutsideElement: true,
			cancelOnMovement: true,
			onFinish: () => {
				setTimeout(() => {
					setClickEvent(true);
				}, 1e2);
			},
			onCancel: () => {
				setTimeout(() => {
					setClickEvent(true);
				}, 1e2);
			},
		},
	);

	return (
		<>
			<div
				className="container-item-home"
				ref={containerRef}
				onClick={onClickProduct}
				{...longPressHandlers()}
			>
				<ImageLoader
					ref={carouselImageRef}
					src={item.images[activeSlide]}
					containerAttrs={{ className: "carousel-image-ref" }}
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

				{item.left === 0 && (
					<span className="badge-out-of-stock">
						<FaExclamation />
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
});

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
	const lp = useLaunchParams();
	const navigate = useNavigate();
	const { settings } = useSettingsStore();
	const [paymentEnabled, setPaymentEnabled] = useState(true);
	const [paymentOverlay, setPaymentOverlay] = useState<
		"success" | "failed" | undefined
	>(undefined);

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

	const onClickButtonSearch = () => {
		invokeHapticFeedbackImpact("light");
		setSearch(true);
	};

	const onClickButtonCart = () => {
		if (!items) return;
		invokeHapticFeedbackImpact("light");
		setModalCart(true);
	};

	const totalPrice = useMemo(() => {
		if (!items) return 0;
		return items.reduce(
			(prev, curr) => prev + curr.price * (cart[curr.id] ?? 0),
			0,
		);
	}, [cart, items]);

	const onClickButtonBuy = async () => {
		invokeHapticFeedbackImpact("medium");
		setPaymentEnabled(false);
		const payment = await handlePayment(totalPrice);
		setPaymentEnabled(true);
		if (payment === undefined) return;
		setPaymentOverlay(payment ? "success" : "failed");
	};

	useEffect(() => {
		if (
			lp.tgWebAppStartParam &&
			!sessionStorage.getItem("visitedTgWebAppStartParam")
		) {
			const matchProduct = lp.tgWebAppStartParam?.match(/product-(\d+)/);

			if (matchProduct) {
				sessionStorage.setItem("visitedTgWebAppStartParam", "true");
				navigate(`/product/${matchProduct[1]}`);
				return;
			}
		}

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
	}, [search, searchQuery, cart, t, onClickButtonSearch, onClickButtonCart]);

	const renderItems = useMemo(() => {
		if (!itemsList) return;
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
	}, [itemsList]);

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
			if (itemsList.length === 0 || settings.emptyItems.enabled) {
				return (
					<div className="container-grid-items-home-not-found">
						<LottiePlayer
							src={lottieAnimations.chick.url}
							fallback={<span>{lottieAnimations.chick.emoji}</span>}
							autoplay
						/>
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

			return <>{renderItems}</>;
		}

		return (
			<SectionError
				title={t("pages.error.data.error.title")}
				description={t("pages.error.data.error.description")}
			/>
		);
	}, [loading, itemsList, search, settings.emptyItems.enabled, t]);

	const renderBuyButton = useMemo(() => {
		if (itemsList && itemsList.length > 0 && Object.keys(cart).length > 0) {
			return (
				<div id="container-action-buttons" className="container-buy-button">
					<div
						className={["primary", paymentEnabled ? "enabled" : "disabled"]
							.filter(Boolean)
							.join(" ")}
						onClick={onClickButtonBuy}
					>
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
	}, [cart, itemsList, totalPrice, t]);

	const renderPaymentOverlay = useMemo(() => {
		if (!paymentOverlay) return;
		return (
			<PaymentOverlay status={paymentOverlay} setStatus={setPaymentOverlay} />
		);
	}, [paymentOverlay]);

	return (
		<>
			<div id="container-page-home">
				<>{renderHeader}</>

				<section>
					<>{renderContent}</>
				</section>

				<BottomBar />

				<>{renderBuyButton}</>

				<>{renderPaymentOverlay}</>
			</div>

			<ModalCart isOpen={modalCart} setOpen={setModalCart} />
		</>
	);
};

export default PageHome;
