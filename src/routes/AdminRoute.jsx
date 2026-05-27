import React, { Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";
const AdminPage = React.lazy(() => import("../pages/AdminPage.jsx"));
import { useAdmin } from "../contexts/AdminContext.jsx";
import useAuth from "../hooks/useAuth.js";

export default function AdminRoute() {
	const { restaurants } = useAdmin();
	const { session, authReady } = useAuth();
	const { slug } = useParams();

	const selectedRestaurant =
		restaurants.find((restaurant) => restaurant.slug === slug) ?? null;

	if (!selectedRestaurant) {
		const fallbackSlug = restaurants[0]?.slug ?? "";
		return <Navigate to={`/admin/${fallbackSlug}`} replace />;
	}

	if (slug !== selectedRestaurant.slug) {
		return <Navigate to={`/admin/${selectedRestaurant.slug}`} replace />;
	}

	if (!authReady) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center text-sm text-slate-500">
				Verificando sesión...
			</div>
		);
	}

	if (!session) {
		return <Navigate to={`/admin/${selectedRestaurant.slug}/login`} replace />;
	}

	if (session.user.id !== selectedRestaurant.ownerId) {
		return <Navigate to={`/admin/${selectedRestaurant.slug}/login`} replace />;
	}

	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center text-sm text-slate-500">
					Cargando admin...
				</div>
			}
		>
			<AdminPage
				key={selectedRestaurant.slug}
				selectedSlug={selectedRestaurant.slug}
			/>
		</Suspense>
	);
}
