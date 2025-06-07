import "./Product.scss";
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
import { invokeHapticFeedbackImpact, postEvent } from "../utils/telegram";
import { useNavigate, useParams } from "react-router";
import { off, on } from "@telegram-apps/sdk-react";
import ImageLoader from "../components/ImageLoader";
import { IconShare } from "../components/Icons";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { motionMultiplier } from "../stores/useSettingsStore";
import { Flip } from "gsap/all";
import {
	ShimmerButton,
	ShimmerText,
	ShimmerThumbnail,
	ShimmerTitle,
} from "react-shimmer-effects";
import { useCartStore } from "../stores/useCartStore";
import SlotCounter from "react-slot-counter";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { priceSymbols } from "../utils/symbols";
import { SectionError } from "./Error";

type ProductProps = {
	item: Item;
	onClose?: () => void;
	standalone?: boolean;
	activeSlideState?: [number, Dispatch<SetStateAction<number>>];
};

export const Product: FC<ProductProps> = ({
	item,
	onClose,
	standalone,
	activeSlideState,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const lightboxRef = useRef<HTMLDivElement>(null);
	const [swiper, setSwiper] = useState<any>(null);
	const [lightbox, setLightBox] = useState(false);
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { cart, increment, decrement } = useCartStore();

	const [activeSlide, setActiveSlide] = activeSlideState ?? [
		undefined,
		undefined,
	];
	const [activeImage, setActiveImage] = useState(activeSlide ?? 0);

	const onBackButton = useCallback(() => {
		navigate("/");
		onClose?.();
	}, [navigate, onClose]);

	const onClickShare = useCallback(() => {
		invokeHapticFeedbackImpact("light");
		postEvent("web_app_open_tg_link", {
			path_full: `/share/url?url=https://t.me/${import.meta.env.VITE_BOT_USERNAME}/${import.meta.env.VITE_MINIAPP_SLUG}?startapp=product-${item.id}&text=${encodeURI(t("pages.product.share"))}`,
		});
	}, []);

	const onClickLightbox = useCallback(() => {
		invokeHapticFeedbackImpact("soft");

		if (lightbox) {
			const imageElement = document.querySelector(
				"#container-lightbox > div.image-loader",
			);
			if (!imageElement) return;

			const flipState = Flip.getState(imageElement);
			document
				.querySelector("#container-image-product")
				?.appendChild(imageElement);
			Flip.from(flipState, {
				duration: 0.25 * motionMultiplier,
				ease: "none",
			});

			setLightBox(false);
		} else {
			const imageElement = document.querySelector(
				"#container-image-product > div.image-loader",
			);
			if (!imageElement) return;

			setLightBox(true);

			setTimeout(() => {
				const flipState = Flip.getState(imageElement);
				lightboxRef.current?.appendChild(imageElement);
				Flip.from(flipState, {
					duration: 0.25 * motionMultiplier,
					ease: "none",
				});
			});
		}
	}, [lightbox, lightboxRef]);

	const onClickButtonAddToCart = useCallback(() => {
		if (cart[item.id.toLocaleString()]) return;
		invokeHapticFeedbackImpact("soft");
		increment(item.id.toString());
	}, [cart, item.id]);

	const onClickDecrement = useCallback(() => {
		invokeHapticFeedbackImpact("soft");
		decrement(item.id.toLocaleString());
	}, [decrement, item.id]);

	const onClickIncrement = useCallback(() => {
		invokeHapticFeedbackImpact("soft");
		increment(item.id.toLocaleString());
	}, [increment, item.id]);

	const onClickButtonBuyNow = useCallback(() => {
		// TODO: implement this
		console.log("Ok");
	}, []);

	useEffect(() => {
		if (!containerRef.current) return;

		window.history.replaceState(null, "", `/product/${item.id}`);

		postEvent("web_app_setup_back_button", {
			is_visible: true,
		});

		on("back_button_pressed", onBackButton);

		invokeHapticFeedbackImpact("medium");

		if (!standalone) {
			containerRef.current.classList.add("show");
		}

		return () => {
			postEvent("web_app_setup_back_button", {
				is_visible: false,
			});

			off("back_button_pressed", onBackButton);
		};
	}, []);

	useEffect(() => {
		setActiveSlide?.(activeImage);
		swiper?.slideTo(activeImage);
	}, [activeImage]);

	return (
		<>
			<div
				ref={containerRef}
				id="container-product"
				className={`${standalone ? "standalone" : "popup"}`}
			>
				<header
					className={`${!standalone ? "animate__animated animate__fadeInUp" : ""}`}
				>
					<h1>{item.name}</h1>

					<div>
						<div onClick={onClickShare}>
							<IconShare />
						</div>
					</div>
				</header>

				<p
					className={`${!standalone ? "animate__animated animate__fadeInUp" : ""}`}
				>
					{item.description}
				</p>

				<ul
					className={`${!standalone ? "animate__animated animate__fadeInUp" : ""}`}
				>
					<li>
						{item.price.toLocaleString()}{" "}
						<span>{priceSymbols[item.currency.toLowerCase()]}</span>
					</li>

					<li>
						{item.left.toLocaleString()}{" "}
						<span>{t("pages.product.inStock")}</span>
					</li>

					{Object.entries(item.tags).map(([key, tag]) => {
						const data = tag.split(" ");

						return (
							<li key={key}>
								{data.length === 2 ? (
									<>
										{data[0]} <span>{data[1]}</span>
									</>
								) : (
									tag
								)}
							</li>
						);
					})}
				</ul>

				<div id="container-image-product" onClick={onClickLightbox}>
					{standalone && <ImageLoader src={item.images[activeImage]} />}
				</div>

				<div id="container-gallery-product">
					<Swiper
						onSwiper={setSwiper}
						slidesPerView={3.5}
						spaceBetween={8}
						slidesOffsetAfter={16}
						initialSlide={activeImage}
						className={`${!standalone ? "animate__animated animate__fadeIn" : ""}`}
					>
						{item.images.map((image, index) => (
							<SwiperSlide
								key={index}
								onClick={() => {
									invokeHapticFeedbackImpact("light");
									setActiveImage(index);
								}}
							>
								<ImageLoader
									containerAttrs={{
										className: `${index === activeImage ? "active" : ""}`,
									}}
									src={image}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div
					id="container-action-buttons"
					className={`${!standalone ? "animate__animated animate__fadeIn" : ""}`}
				>
					<div
						className="secondary"
						id="container-button-addToCart"
						onClick={onClickButtonAddToCart}
					>
						{cart[item.id] ? (
							<div>
								<button onClick={onClickDecrement}>
									<FaMinus />
								</button>
								<SlotCounter
									autoAnimationStart={false}
									value={cart[item.id]}
									duration={0.125 * motionMultiplier}
									sequentialAnimationMode
								/>
								<button onClick={onClickIncrement}>
									<FaPlus />
								</button>
							</div>
						) : (
							<span>{t("pages.product.addToCart")}</span>
						)}
					</div>

					<div className="primary" onClick={onClickButtonBuyNow}>
						<span>{t("pages.product.buyNow")}</span>
					</div>
				</div>
			</div>

			{lightbox && (
				<div
					ref={lightboxRef}
					id="container-lightbox"
					onClick={onClickLightbox}
				></div>
			)}
		</>
	);
};

const PageProduct = () => {
	const { items, loading, fetchItems } = useItemsStore();
	const { t } = useTranslation();
	const params = useParams();
	const item = useMemo(
		() => items?.find((item) => item.id.toString() === params.id),
		[items],
	);

	useEffect(() => {
		if (!items) {
			fetchItems();
		}
	}, []);

	const renderContent = useMemo(() => {
		if (loading) {
			return (
				<div id="container-product-shimmer">
					<header>
						<ShimmerTitle line={1} variant="primary" />
						<ShimmerButton />
					</header>

					<ShimmerText line={2} />

					<ul>
						<li>
							<ShimmerTitle line={1} variant="secondary" />
						</li>

						<li>
							<ShimmerTitle line={1} variant="secondary" />
						</li>

						<li>
							<ShimmerTitle line={1} variant="secondary" />
						</li>
					</ul>

					<ShimmerThumbnail />

					<ul>
						<li>
							<ShimmerThumbnail />
						</li>

						<li>
							<ShimmerThumbnail />
						</li>

						<li>
							<ShimmerThumbnail />
						</li>
					</ul>

					<ul>
						<li>
							<ShimmerButton />
						</li>

						<li>
							<ShimmerButton />
						</li>
					</ul>
				</div>
			);
		}

		if (item) {
			return <Product item={item} standalone />;
		}

		return (
			<SectionError
				title={t("pages.error.data.error.title")}
				description={t("pages.error.data.error.description")}
			/>
		);
	}, [loading, item, t]);

	return (
		<div id="container-page-product">
			<>{renderContent}</>
		</div>
	);
};

export default PageProduct;
