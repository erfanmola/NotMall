export const formatUnixDate = (ts: number) =>
	new Date(ts * 1000)
		.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "2-digit",
		})
		.replace(/(\d{2}) (\w{3}) (\d{2})/, (_, d, m, y) => `${d} ${m} ‘${y}`);
