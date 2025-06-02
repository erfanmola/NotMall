import { useEffect, useState } from "react";

import { useItemsStore } from "../stores/useItemsStore";

export const useLoadItems = () => {
	const items = useItemsStore((s) => s.items);
	const fetchItems = useItemsStore((s) => s.fetchItems);
	const [loading, setLoading] = useState(!items);

	useEffect(() => {
		if (!items) {
			fetchItems().finally(() => setLoading(false));
		}
	}, [items, fetchItems]);

	return { items, loading };
};
