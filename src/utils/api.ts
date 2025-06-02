export const requestAPI = async (
	path = "/",
	params: { [key: string]: string } = {},
	method: "GET" | "POST" = "POST",
): Promise<any | null | false> => {
	try {
		const headers: { [key: string]: string } = {};

		const FD = new FormData();
		for (const [key, item] of Object.entries(params)) {
			FD.append(key, item);
		}

		const request = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + path, {
			method: method,
			body: method === "POST" ? FD : undefined,
			headers: headers,
		});

		const result = await request.json();

		if ("data" in result && result.ok) {
			return result.data;
		}
		return false;
	} catch (e) {
		return null;
	}
};
