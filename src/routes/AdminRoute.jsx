import React, { Suspense, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
const AdminPage = React.lazy(() => import("../pages/AdminPage.jsx"));
import { useAdmin } from "../contexts/useAdmin.js";
import useAuth from "../hooks/useAuth.js";
import { fetchRestaurantDetails } from "../services/restaurantsService.js";
import { LoadingScreen } from "../components/ui/index.js";

function LoadingAdmin() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center text-sm text-slate-500">
			Cargando admin...
		</div>
	);
}

export default function AdminRoute() {
	const { restaurants, updateRestaurantField, isLoading } = useAdmin();
	const { session, authReady } = useAuth();
	const { slug } = useParams();
	const [detailsResolved, setDetailsResolved] = useState(false);

	const selectedRestaurant =
		restaurants.find((restaurant) => restaurant.slug === slug) ?? null;
	const restaurantId = selectedRestaurant?.id ?? null;
	const restaurantMenusLength = selectedRestaurant?.menus?.length ?? 0;

	useEffect(() => {
		let mounted = true;

		if (!restaurantId) return;
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
		!!selectedRestaurant &&
		(selectedRestaurant.menus?.length ?? 0) === 0 &&
		!detailsResolved;

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (!selectedRestaurant) {
		const fallbackSlug = restaurants[0]?.slug ?? "";
		return <Navigate to={`/admin/${fallbackSlug}`} replace />;
	}

	if (!authReady) {
		return <LoadingAdmin />;
	}

	if (!session) {
		return <Navigate to={`/admin/${selectedRestaurant.slug}/login`} replace />;
	}

	if (loadingDetails) {
		return <LoadingAdmin />;
	}

	if (session.user.id !== selectedRestaurant.ownerId) {
		return <Navigate to={`/admin/${selectedRestaurant.slug}/login`} replace />;
	}

	return (
		<Suspense fallback={<LoadingAdmin />}>
			<AdminPage
				key={selectedRestaurant.slug}
				selectedRestaurant={selectedRestaurant}
			/>
		</Suspense>
	);
}
