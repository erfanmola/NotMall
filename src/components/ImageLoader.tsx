import "./ImageLoader.scss";
import { useEffect, useRef, useState, type FC, type Ref } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { simulateDelay } from "../stores/useSettingsStore";

const ImageLoader: FC<{
	src: string;
	ref?: Ref<HTMLDivElement>;
	containerAttrs?: React.HTMLAttributes<HTMLDivElement>;
	imageAttrs?: React.ImgHTMLAttributes<HTMLImageElement>;
}> = (props) => {
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
	}, [props.src]);

	return (
		<div
			{...props.containerAttrs}
			className={`image-loader ${props.containerAttrs?.className ?? ""}`}
			ref={props.ref}
		>
			{loaded === false && <ShimmerThumbnail />}
			<img ref={imgRef} src={props.src} {...props.imageAttrs} />
		</div>
	);
};

export default ImageLoader;
