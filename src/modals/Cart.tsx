import type { Dispatch, FC, SetStateAction } from "react";

import { FaMinus } from "react-icons/fa6";
import ImageLoader from "../components/ImageLoader";
import { IoClose } from "react-icons/io5";
import { Sheet } from "react-modal-sheet";
import { invokeHapticFeedbackImpact } from "../utils/telegram";
import { useCartStore } from "../stores/useCartStore";
import { useItemsStore } from "../stores/useItemsStore";
import { useTranslation } from "react-i18next";

const ModalCart: FC<{
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setOpen }) => {
	const { cart, remove } = useCartStore();
	const { t } = useTranslation();
	const { items } = useItemsStore();

	return (
		<Sheet
			isOpen={isOpen}
			onClose={() => setOpen(false)}
			detent="content-height"
		>
			<Sheet.Container>
				{Object.keys(cart).length > 0 ? (
					<Sheet.Content className="container-modal-cart">
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
										<div>
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
					</Sheet.Content>
				) : (
					<Sheet.Content className="container-modal-cart-empty">
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
					</Sheet.Content>
				)}
			</Sheet.Container>
			<Sheet.Backdrop onTap={() => setOpen(false)} />
		</Sheet>
	);
};

export default ModalCart;
