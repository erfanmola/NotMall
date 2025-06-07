import Lottie from "lottie-react-light";
import { useEffect, useState, type FC, type JSX } from "react";
import { useSettingsStore } from "../stores/useSettingsStore";

export type LottiePlayerProps = {
	src: string;
	autoplay?: boolean;
	loop?: boolean;
	fallback?: JSX.Element;
};

export const LottiePlayerFileCache: { [key: string]: any } = {};

const LottiePlayer: FC<LottiePlayerProps> = (props) => {
	const [loaded, setLoaded] = useState(false);
	const { settings } = useSettingsStore();

	useEffect(() => {
		if (props.src in LottiePlayerFileCache) {
			setLoaded(true);
		} else {
			fetch(props.src).then(async (response) => {
				try {
					LottiePlayerFileCache[props.src] = JSON.parse(await response.text());
					setLoaded(true);
				} catch (error) {
					console.error("Failed to load animation", error);
					setLoaded(false);
				}
			});
		}
	}, [props.src]);

	return (
		<div className="lottie-animation">
			{loaded && (
				<Lottie
					animationData={LottiePlayerFileCache[props.src]}
					loop={props.loop ?? false}
					autoplay={(props.autoplay ?? false) && !settings.reduceMotion.enabled}
				/>
			)}
			{!loaded &&
				props.fallback &&
				!(props.src in LottiePlayerFileCache) &&
				props.fallback}
		</div>
	);
};

export default LottiePlayer;
