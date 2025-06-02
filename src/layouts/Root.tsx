import { Outlet, ScrollRestoration, useLocation } from "react-router";

import BottomBar from "../components/BottomBar";
import { useMemo } from "react";

const LayoutRoot = () => {
	const location = useLocation();
	const displayBottombar = useMemo(
		() => ["/", "/profile"].includes(location.pathname),
		[location.pathname],
	);

	return (
		<>
			<main>
				<Outlet />
			</main>

			{displayBottombar && <BottomBar />}

			<ScrollRestoration />
		</>
	);
};

export default LayoutRoot;
