import { useState } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { Header, AdminHamburgerMenu } from "../components";
import { useAdmin } from "../contexts/AdminContext.jsx";
import useAuth from "../hooks/useAuth.js";

export default function AdminPage({ selectedSlug }) {
	const {
		restaurants,
		updateRestaurantField,
		addMenu,
		updateMenuField,
		removeMenu,
		updateCategoryField,
		reorderCategory,
		addCategory,
		removeCategory,
		addDish,
		updateDishField,
		reorderDish,
		removeDish,
		isPublished,
		setIsPublished,
	} = useAdmin();
	const { signOut } = useAuth();

	const selectedRestaurant =
		restaurants.find((restaurant) => restaurant.slug === selectedSlug) ??
		restaurants[0];

	// Ensure restaurant has menus array
	const safeRestaurant = {
		...selectedRestaurant,
		menus: selectedRestaurant?.menus || [],
	};

	const [adminMenuOpen, setAdminMenuOpen] = useState(false);
	const [activeMenuId, setActiveMenuId] = useState(
		safeRestaurant.menus[0]?.id || null,
	);

	const location = useLocation();
	const adminActiveSection = (() => {
		try {
			const parts = location.pathname.split("/").filter(Boolean);
			// parts = ["admin", ":slug", "section", ...]
			return parts[2] || "dashboard";
		} catch {
			return null;
		}
	})();

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header con hamburger menu a la derecha */}
			<Header
				selectedRestaurant={safeRestaurant}
				categories={[]}
				adminMenuOpen={adminMenuOpen}
				onAdminMenuToggle={() => setAdminMenuOpen(!adminMenuOpen)}
				adminActiveSection={adminActiveSection}
			/>

			{/* Layout con Hamburger Menu/Sidebar */}
			<div className="flex flex-col lg:flex-row">
				{/* Hamburger Menu/Sidebar */}
				<AdminHamburgerMenu
					selectedSlug={selectedSlug}
					isOpen={adminMenuOpen}
					onLogout={signOut}
				/>

				{/* Main Content */}
				<main className="flex-1 w-full pt-4 lg:pt-0">
					<div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:ml-0">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
}
