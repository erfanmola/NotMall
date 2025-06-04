import { Outlet, ScrollRestoration } from "react-router";

const LayoutRoot = () => {
	return (
		<>
			<main>
				<Outlet />
			</main>

			<ScrollRestoration />
		</>
	);
};

export default LayoutRoot;
