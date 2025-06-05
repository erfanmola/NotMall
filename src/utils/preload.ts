import { LottiePlayerFileCache } from "../components/LottiePlayer";
import { lottieAnimations } from "./lottie";

export const preloadLottieAnimations = async () => {
	for (const animationIndex in lottieAnimations) {
		const src =
			lottieAnimations[animationIndex as keyof typeof lottieAnimations].url;
		fetch(src).then(async (response) => {
			try {
				LottiePlayerFileCache[src] = JSON.parse(await response.text());
			} catch (e) {}
		});
	}
};
