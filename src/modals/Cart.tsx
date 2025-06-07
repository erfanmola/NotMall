import "./Cart.scss";
import { useMemo, type Dispatch, type FC, type SetStateAction } from "react";

import { FaMinus } from "react-icons/fa6";
import ImageLoader from "../components/ImageLoader";
import { IoClose } from "react-icons/io5";
import { invokeHapticFeedbackImpact } from "../utils/telegram";
import { useCartStore } from "../stores/useCartStore";
import { useItemsStore } from "../stores/useItemsStore";
import { useTranslation } from "react-i18next";
import { Drawer } from "vaul";

const ModalCart: FC<{
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setOpen }) => {
	const { cart, remove } = useCartStore();
	const { t } = useTranslation();
	const { items } = useItemsStore();

	const renderContent = useMemo(() => {
		if (Object.keys(cart).length > 0) {
			return (
				<div className="container-modal-cart">
					<span
						className="btn-close-modal"
						onClick={() => {
							invokeHapticFeedbackImpact("light");
							setOpen(false);
						}}
					>
						<IoClose />
					</span>

					<div>
						<header>
							<h2>{t("modals.cart.title")}</h2>
						</header>

						<div>
							{Object.entries(cart).map(([productId, quantity]) => {
								const item = items?.find(
									(i) => i.id === Number.parseInt(productId),
								);
								if (!item) return;

								return (
									<div key={productId}>
										<ImageLoader src={item.images[0]} />

										<div>
											<span>{item.category}</span>
											<h3>{item.name}</h3>
										</div>

										<span>
											{quantity > 1 && (
												<span>
													{quantity} <IoClose />
												</span>
											)}
											{item.price.toLocaleString()} {item.currency}
										</span>

										<span
											onClick={() => {
												invokeHapticFeedbackImpact("medium");
												remove(item.id.toString());
											}}
										>
											<FaMinus />
										</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className="container-modal-cart-empty">
				<span
					className="btn-close-modal"
					onClick={() => {
						invokeHapticFeedbackImpact("light");
						setOpen(false);
					}}
				>
					<IoClose />
				</span>

				<div>
					<h2>{t("modals.cart.noItems.title")}</h2>
					<span>{t("modals.cart.noItems.description")}</span>
				</div>

				<div id="container-action-buttons" style={{ paddingTop: "0" }}>
					<div
						className="primary"
						onClick={() => {
							invokeHapticFeedbackImpact("light");
							setOpen(false);
						}}
					>
						<span>{t("general.ok")}</span>
					</div>
				</div>
			</div>
		);
	}, [cart, items]);

	return (
		<Drawer.Root open={isOpen} onOpenChange={setOpen}>
			<Drawer.Portal>
				<Drawer.Overlay className="vaul-overlay" />
				<Drawer.Content className="vaul-content" aria-describedby={undefined}>
					<Drawer.Title style={{ display: "none" }}>
						{t("modals.cart.title")}
					</Drawer.Title>

					<div>{renderContent}</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
};

export default ModalCart;
