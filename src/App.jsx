import { useMemo } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import AdminLoginRoute from "./routes/AdminLoginRoute.jsx";
import SettingsPage from "./pages/admin/SettingsPage.jsx";
import DashboardPage from "./pages/admin/DashboardPage.jsx";
import useRestaurants from "./hooks/useRestaurants.js";
import { AdminProvider } from "./contexts/AdminContext.jsx";
import { useAdmin } from "./contexts/useAdmin.js";
import { LoadingScreen, NoRestaurants } from "./components/ui/index.js";
import {
	BillingWrapper,
	BrandWrapper,
	InvoicesWrapper,
	LocalWrapper,
	SettingsIndexWrapper,
	MenusWrapper,
	CategoriesWrapper,
	DishesWrapper,
} from "./routes/admin/index.js";
import ChartPage from "./pages/admin/ChartPage.jsx";

function KeyedAdminRoute() {
	const { slug } = useParams();
	return <AdminRoute key={slug} />;
}

function KeyedPublicRoute() {
	const { restaurantSlug } = useParams();
	return <PublicRoute key={restaurantSlug} />;
}

function PublicHomeRoute() {
	const { restaurants, isLoading } = useAdmin();

	if (isLoading) return <LoadingScreen />;
	if (restaurants.length === 0) return <NoRestaurants />;

	return <Navigate to={`/${restaurants[0].slug}`} replace />;
}

function AdminHomeRoute() {
	const { restaurants, isLoading } = useAdmin();

	if (isLoading) return <LoadingScreen />;
	if (restaurants.length === 0) return <NoRestaurants />;

	return <Navigate to={`/admin/${restaurants[0].slug}`} replace />;
}

export default function App() {
	const {
		restaurants,
		isLoading,
		isPublished,
		setIsPublished,
		addMenu,
		updateMenuField,
		removeMenu,
		updateCategoryField,
		reorderCategory,
		addCategory,
		removeCategory,
		addDish,
		reorderDish,
		updateDishField,
		removeDish,
		updateRestaurantField,
	} = useRestaurants();
	// memoize admin context to avoid causing extra provider re-renders
	const adminContextValue = useMemo(
		() => ({
			restaurants,
			isLoading,
			isPublished,
			setIsPublished,
			addMenu,
			updateMenuField,
			removeMenu,
			updateCategoryField,
			reorderCategory,
			addCategory,
			removeCategory,
			addDish,
			reorderDish,
			updateDishField,
			removeDish,
			updateRestaurantField,
		}),
		[
			restaurants,
			isLoading,
			isPublished,
			setIsPublished,
			addMenu,
			updateMenuField,
			removeMenu,
			updateCategoryField,
			reorderCategory,
			addCategory,
			removeCategory,
			addDish,
			reorderDish,
			updateDishField,
			removeDish,
			updateRestaurantField,
		],
	);

	return (
		<AdminProvider value={adminContextValue}>
			<Routes>
				<Route path="/" element={<PublicHomeRoute />} />
				<Route path="/:restaurantSlug" element={<KeyedPublicRoute />} />
				<Route
					path="/:restaurantSlug/:menuSlug"
					element={<KeyedPublicRoute />}
				/>
				<Route path="/admin" element={<AdminHomeRoute />} />
				<Route path="/admin/:slug/login" element={<AdminLoginRoute />} />
				<Route path="/admin/:slug/*" element={<KeyedAdminRoute />}>
					<Route index element={<Navigate to="dashboard" replace />} />
					<Route path="dashboard" element={<DashboardPage />} />
					<Route path="chart" element={<ChartPage />}>
						<Route index element={<MenusWrapper />} />
						<Route path=":menuSlug" element={<CategoriesWrapper />} />
						<Route path=":menuSlug/:categorySlug" element={<DishesWrapper />} />
					</Route>
					<Route path="settings" element={<SettingsPage />}>
						<Route index element={<SettingsIndexWrapper />} />
						<Route path="local" element={<LocalWrapper />} />
						<Route path="brand" element={<BrandWrapper />} />
						<Route path="billing" element={<BillingWrapper />} />
						<Route path="invoices" element={<InvoicesWrapper />} />
					</Route>
				</Route>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</AdminProvider>
	);
}
