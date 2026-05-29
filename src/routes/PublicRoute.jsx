import React, { Suspense, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
const PublicMenuPage = React.lazy(() => import("../pages/PublicMenuPage.jsx"));
import { useAdmin } from "../contexts/useAdmin.js";
import { fetchRestaurantDetails } from "../services/restaurantsService.js";
import { LoadingScreen } from "../components/ui/index.js";

function LoadingCategories() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center text-sm text-slate-500">
			Cargando categorías...
		</div>
	);
}

function LoadingMenu() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center text-sm text-slate-500">
			Cargando menú...
		</div>
	);
}

export default function PublicRoute() {
	const { restaurantSlug, menuSlug } = useParams();
	const { restaurants, updateRestaurantField, isLoading } = useAdmin();

	const selectedRestaurant =
		restaurants.find((r) => r.slug === restaurantSlug) ?? null;
	const restaurantId = selectedRestaurant?.id ?? null;
	const restaurantMenusLength = selectedRestaurant?.menus?.length ?? 0;

	const [detailsResolved, setDetailsResolved] = useState(false);

	useEffect(() => {
		let mounted = true;
		if (!restaurantId) return;
		// if menus already present, nothing to do
		if (restaurantMenusLength > 0) return;

		fetchRestaurantDetails(restaurantId)
			.then((menus) => {
				if (!mounted) return;
				if (menus && menus.length > 0) {
					updateRestaurantField(restaurantId, "menus", menus);
				}
			})
			.catch(() => {})
			.finally(() => {
				if (mounted) setDetailsResolved(true);
			});

		return () => {
			mounted = false;
		};
	}, [restaurantId, restaurantMenusLength, updateRestaurantField]);

	const loadingDetails =
		!!selectedRestaurant && restaurantMenusLength === 0 && !detailsResolved;

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (!selectedRestaurant) {
		const fallbackSlug = restaurants[0]?.slug ?? "";
		return <Navigate to={`/${fallbackSlug}`} replace />;
	}

	return loadingDetails ? (
		<LoadingCategories />
	) : (
		<Suspense fallback={<LoadingMenu />}>
			<PublicMenuPage
				key={`${selectedRestaurant.slug}-${menuSlug}`}
				selectedRestaurant={selectedRestaurant}
				selectedMenuSlug={menuSlug}
			/>
		</Suspense>
	);
}
