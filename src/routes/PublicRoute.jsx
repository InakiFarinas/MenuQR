import React, { Suspense, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
const PublicMenuPage = React.lazy(() => import("../pages/PublicMenuPage.jsx"));
import { useAdmin } from "../contexts/AdminContext.jsx";

export default function PublicRoute() {
	const { restaurantSlug, menuSlug } = useParams();
	const { restaurants, loadRestaurantDetails } = useAdmin();
	const [loadingDetails, setLoadingDetails] = useState(false);

	const selectedRestaurant =
		restaurants.find((r) => r.slug === restaurantSlug) ?? null;

	if (!selectedRestaurant) {
		const fallbackSlug = restaurants[0]?.slug ?? "";
		return <Navigate to={`/${fallbackSlug}`} replace />;
	}

	if (restaurantSlug !== selectedRestaurant.slug) {
		return <Navigate to={`/${selectedRestaurant.slug}`} replace />;
	}

	useEffect(() => {
		let mounted = true;
		if (!selectedRestaurant) return;
		if (selectedRestaurant.menus && selectedRestaurant.menus.length > 0) return;
		setLoadingDetails(true);
		loadRestaurantDetails(selectedRestaurant.id).finally(() => {
			if (mounted) setLoadingDetails(false);
		});

		return () => {
			mounted = false;
		};
	}, [selectedRestaurant, loadRestaurantDetails]);

	return (
		<>
			{loadingDetails ? (
				<div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center text-sm text-slate-500">
					Cargando categorías...
				</div>
			) : (
				<Suspense
					fallback={
						<div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center text-sm text-slate-500">
							Cargando menú...
						</div>
					}
				>
					<PublicMenuPage
						key={`${selectedRestaurant.slug}-${menuSlug}`}
						selectedRestaurant={selectedRestaurant}
						selectedMenuSlug={menuSlug}
					/>
				</Suspense>
			)}
		</>
	);
}
