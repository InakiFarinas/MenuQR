import { Navigate, useParams } from "react-router-dom";
import AdminLoginPage from "../pages/AdminLoginPage.jsx";
import { useAdmin } from "../contexts/AdminContext.jsx";
import useAuth from "../hooks/useAuth.js";

export default function AdminLoginRoute() {
	const { restaurants } = useAdmin();
	const { session, authReady, signOut } = useAuth();
	const { slug } = useParams();
	const selectedRestaurant =
		restaurants.find((restaurant) => restaurant.slug === slug) ?? null;

	if (!selectedRestaurant) {
		const fallbackSlug = restaurants[0]?.slug ?? "";
		return <Navigate to={`/admin/${fallbackSlug}`} replace />;
	}

	if (!authReady) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center text-sm text-slate-500">
				Verificando sesión...
			</div>
		);
	}

	if (session?.user?.id === selectedRestaurant.ownerId) {
		return <Navigate to={`/admin/${selectedRestaurant.slug}`} replace />;
	}

	return (
		<AdminLoginPage
			selectedRestaurant={selectedRestaurant}
			currentUserId={session?.user?.id ?? null}
			onLogout={signOut}
		/>
	);
}
