import "./PaymentOverlay.scss";

import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";

import LottiePlayer from "./LottiePlayer";
import { createPortal } from "react-dom";
import {
	invokeHapticFeedbackImpact,
	invokeHapticFeedbackNotification,
} from "../utils/telegram";
import { lottieAnimations } from "../utils/lottie";
import { useTranslation } from "../i18n/i18nProvider";
import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

export type PaymentOverlayProps = {
	status: "success" | "failed";
	setStatus: Dispatch<SetStateAction<"success" | "failed" | undefined>>;
};

const PaymentOverlay: FC<PaymentOverlayProps> = ({ status, setStatus }) => {
	const { t } = useTranslation();
	const animation =
		lottieAnimations[status === "success" ? "confetti" : "duckForbidden"];

	useEffect(() => {
		invokeHapticFeedbackNotification(
			status === "success" ? "success" : "error",
		);

		if (status === "success") {
			jsConfetti.addConfetti();
		} else {
			jsConfetti.addConfetti({
				emojis: ["🍆", "🐓"],
			});
		}

		return () => {
			jsConfetti.clearCanvas();
		};
	});

	return createPortal(
		<div id="container-payment-overlay">
			<LottiePlayer
				src={animation.url}
				fallback={<span>{animation.emoji}</span>}
				autoplay
			/>

			<h1>{t(`pages.purchase.${status}.title`)}</h1>

			<span>{t(`pages.purchase.${status}.description`)}</span>

			<button
				onClick={() => {
					invokeHapticFeedbackImpact("medium");
					setStatus(undefined);
				}}
			>
				{t(`pages.purchase.${status}.button`)}
			</button>
		</div>,
		document.body,
	);
};

export default PaymentOverlay;
