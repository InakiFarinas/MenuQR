import { useState, useEffect, useCallback } from "react";
import {
	fetchRestaurants,
	fetchRestaurantsSummary,
} from "../services/restaurantsService.js";
import useMenuActions from "./useMenuActions.js";
import useCategoryActions from "./useCategoryActions.js";
import useDishActions from "./useDishActions.js";
import supabase from "../lib/supabaseClient.js";
import { persistMutation } from "../utils/restaurantMappers.js";

export default function useRestaurants() {
	const [restaurants, setRestaurants] = useState(() => []);
	const [isLoading, setIsLoading] = useState(true);
	const [isPublished, setIsPublished] = useState(true);

	useEffect(() => {
		let mounted = true;
		fetchRestaurantsSummary()
			.then((data) => {
				if (!mounted) return;
				setRestaurants(data || []);
			})
			.catch(() => {
				if (!mounted) return;
				setRestaurants([]);
			})
			.finally(() => {
				if (!mounted) return;
				setIsLoading(false);
			});

		return () => {
			mounted = false;
		};
	}, []);

	const patchRestaurant = useCallback((restaurantId, updater) => {
		setRestaurants((currentRestaurants) =>
			currentRestaurants.map((restaurant) =>
				restaurant.id === restaurantId ? updater(restaurant) : restaurant,
			),
		);
	}, []);

	const getRestaurantById = useCallback(
		(restaurantId) =>
			restaurants.find((restaurant) => restaurant.id === restaurantId),
		[restaurants],
	);

	const menuActions = useMenuActions({ patchRestaurant });
	const categoryActions = useCategoryActions({
		patchRestaurant,
		getRestaurantById,
	});
	const dishActions = useDishActions({
		patchRestaurant,
		setRestaurants,
		getRestaurantById,
	});

	const updateRestaurantField = useCallback(
		(restaurantId, field, value) => {
			patchRestaurant(restaurantId, (restaurant) => ({
				...restaurant,
				[field]: value,
			}));

			if (!supabase) return;

			const columnMap = {
				name: "nombre",
				avatarImage: "logo_url",
				avatarBackgroundImage: "cover_url",
				accent: "accent",
			};

			const column = columnMap[field];
			if (!column) return;

			persistMutation("Failed to persist restaurant field", async () => {
				const { error } = await supabase
					.from("restaurants")
					.update({ [column]: value })
					.eq("id", restaurantId);

				if (error) throw error;
			});
		},
		[patchRestaurant],
	);

	const refresh = useCallback((options = {}) => {
		setIsLoading(true);
		if (options.full) {
			fetchRestaurants()
				.then((data) => {
					setRestaurants(data || []);
				})
				.catch(() => {
					setRestaurants([]);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			fetchRestaurantsSummary()
				.then((data) => {
					setRestaurants(data || []);
				})
				.catch(() => {
					setRestaurants([]);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, []);

	return {
		restaurants,
		isLoading,
		isPublished,
		setIsPublished,
		refresh,
		patchRestaurant,
		updateRestaurantField,
		...menuActions,
		...categoryActions,
		...dishActions,
	};
}
