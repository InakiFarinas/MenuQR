import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import AdminLoginRoute from "./routes/AdminLoginRoute.jsx";
import SettingsPage from "./pages/admin/SettingsPage.jsx";
import useRestaurants from "./hooks/useRestaurants.js";
import { AdminProvider } from "./contexts/AdminContext.jsx";
import { LoadingScreen, NoRestaurants } from "./components/ui/index.js";
import {
	BillingWrapper,
	BrandWrapper,
	ChartWrapper,
	DashboardWrapper,
	InvoicesWrapper,
	LocalWrapper,
	SettingsIndexWrapper,
} from "./routes/admin/index.js";

export default function App() {
	const {
		restaurants,
		isLoading,
		isPublished,
		setIsPublished,
		loadRestaurantDetails,
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
			loadRestaurantDetails,
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
			loadRestaurantDetails,
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

	if (isLoading) return <LoadingScreen />;

	if (restaurants.length === 0) return <NoRestaurants />;

	return (
		<AdminProvider value={adminContextValue}>
			<Routes>
				<Route
					path="/"
					element={<Navigate to={`/${restaurants[0].slug}`} replace />}
				/>
				<Route path="/:restaurantSlug" element={<PublicRoute />} />
				<Route path="/:restaurantSlug/:menuSlug" element={<PublicRoute />} />
				<Route
					path="/admin"
					element={<Navigate to={`/admin/${restaurants[0].slug}`} replace />}
				/>
				<Route path="/admin/:slug/login" element={<AdminLoginRoute />} />
				<Route path="/admin/:slug/*" element={<AdminRoute />}>
					<Route index element={<Navigate to="dashboard" replace />} />
					<Route path="dashboard" element={<DashboardWrapper />} />
					<Route path="chart" element={<ChartWrapper />} />
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
