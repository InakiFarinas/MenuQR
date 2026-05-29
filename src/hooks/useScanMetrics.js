import { useEffect, useState } from "react";
import { fetchScanMetrics } from "../services/scanService.js";

const defaultMetrics = { today: 0, week: 0, month: 0 };

export default function useScanMetrics(restaurantId) {
	const [state, setState] = useState({
		metrics: defaultMetrics,
		loadedRestaurantId: null,
	});
	const isLoading =
		Boolean(restaurantId) && state.loadedRestaurantId !== restaurantId;

	useEffect(() => {
		if (!restaurantId) {
			return;
		}

		let mounted = true;

		fetchScanMetrics(restaurantId)
			.then((data) => {
				if (!mounted) return;
				setState({ metrics: data, loadedRestaurantId: restaurantId });
			})
			.catch(() => {
				if (!mounted) return;
				setState({ metrics: defaultMetrics, loadedRestaurantId: restaurantId });
			});

		return () => {
			mounted = false;
		};
	}, [restaurantId]);

	return {
		metrics: restaurantId ? state.metrics : defaultMetrics,
		isLoading,
	};
}
