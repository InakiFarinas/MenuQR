import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminLoginPage from "../pages/AdminLoginPage.jsx";
import { useAdmin } from "../contexts/useAdmin.js";
import useAuth from "../hooks/useAuth.js";
import { LoadingScreen } from "../components/ui/index.js";

function LoadingAuth() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center text-sm text-slate-500">
			Verificando sesión...
		</div>
	);
}

export default function AdminLoginRoute() {
	const navigate = useNavigate();
	const { restaurants, isLoading } = useAdmin();
	const { session, authReady, signOut, login, registerRestaurant } = useAuth();
	const { slug } = useParams();
	const selectedRestaurant =
		restaurants.find((restaurant) => restaurant.slug === slug) ?? null;

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (!selectedRestaurant) {
		const fallbackSlug = restaurants[0]?.slug ?? "";
		return <Navigate to={`/admin/${fallbackSlug}`} replace />;
	}

	if (!authReady) {
		return <LoadingAuth />;
	}

	if (session?.user?.id === selectedRestaurant.ownerId) {
		return <Navigate to={`/admin/${selectedRestaurant.slug}`} replace />;
	}

	function handleSuccess(slug) {
		navigate(`/admin/${slug}`, { replace: true });
	}

	return (
		<AdminLoginPage
			key={selectedRestaurant.slug}
			selectedRestaurant={selectedRestaurant}
			currentUserId={session?.user?.id ?? null}
			onLogin={login}
			onRegisterRestaurant={registerRestaurant}
			onLogout={signOut}
			onSuccess={handleSuccess}
		/>
	);
}
