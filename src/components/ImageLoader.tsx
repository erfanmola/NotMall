import "./ImageLoader.scss";
import { useEffect, useRef, useState, type FC } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { simulateDelay } from "../stores/useSettingsStore";

const ImageLoader: FC<{ src: string }> = ({ src }) => {
	const imgRef = useRef<HTMLImageElement>(null);
	const [loaded, setLoaded] = useState<boolean | null>(null);

	useEffect(() => {
		const img = imgRef.current;
		if (!img) return;
		setLoaded(img.complete);

		const handleLoad = () => {
			if (!simulateDelay) {
				setLoaded(true);
			} else {
				setTimeout(() => {
					setLoaded(true);
				}, simulateDelay);
			}
		};

		img.addEventListener("load", handleLoad);

		return () => {
			img.removeEventListener("load", handleLoad);
		};
	}, [src]);

	return (
		<div className="image-loader">
			{loaded === false && <ShimmerThumbnail />}
			<img ref={imgRef} src={src} />
		</div>
	);
};

export default ImageLoader;
