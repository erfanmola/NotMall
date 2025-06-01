import { isRouteErrorResponse, useRouteError } from "react-router";

import LayoutRoot from "./layouts/Root";
import PageError from "./pages/Error";
import PageHome from "./pages/Home";
import { createBrowserRouter } from "react-router";

const ErrorFallback = () => {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<PageError
				title={error.status.toString()}
				description={error.statusText}
			/>
		);
	}

	return <PageError />;
};

export const router = createBrowserRouter([
	{
		path: "/",
		Component: LayoutRoot,
		errorElement: <ErrorFallback />,
		children: [
			{
				index: true,
				Component: PageHome,
			},
		],
	},
]);
