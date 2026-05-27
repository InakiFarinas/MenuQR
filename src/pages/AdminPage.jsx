import { useState } from "react";
import {
	Header,
	AdminHamburgerMenu,
	AdminDashboard,
	AdminChartNew,
	AdminSettings,
} from "../components";

export default function AdminPage({
	restaurants,
	selectedSlug,
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
}) {
	const selectedRestaurant =
		restaurants.find((restaurant) => restaurant.slug === selectedSlug) ??
		restaurants[0];

	// Ensure restaurant has menus array
	const safeRestaurant = {
		...selectedRestaurant,
		menus: selectedRestaurant?.menus || [],
	};

	const [activeSection, setActiveSection] = useState("dashboard");
	const [adminMenuOpen, setAdminMenuOpen] = useState(false);
	const [activeMenuId, setActiveMenuId] = useState(
		safeRestaurant.menus[0]?.id || null,
	);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header con hamburger menu a la derecha */}
			<Header
				selectedRestaurant={safeRestaurant}
				categories={[]}
				adminMenuOpen={adminMenuOpen}
				onAdminMenuToggle={() => setAdminMenuOpen(!adminMenuOpen)}
				adminActiveSection={activeSection}
			/>

			{/* Layout con Hamburger Menu/Sidebar */}
			<div className="flex flex-col lg:flex-row">
				{/* Hamburger Menu/Sidebar */}
				<AdminHamburgerMenu
					activeSection={activeSection}
					setActiveSection={(section) => {
						setActiveSection(section);
						setAdminMenuOpen(false);
					}}
					isOpen={adminMenuOpen}
				/>

				{/* Main Content */}
				<main className="flex-1 w-full pt-4 lg:pt-0">
					<div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:ml-0">
						{/* Dashboard Section */}
						{activeSection === "dashboard" && (
							<AdminDashboard selectedRestaurant={safeRestaurant} />
						)}

						{/* Chart/Menu Management Section */}
						{activeSection === "chart" && (
							<AdminChartNew
								selectedRestaurant={safeRestaurant}
								activeMenuId={activeMenuId}
								setActiveMenuId={setActiveMenuId}
								updateRestaurantField={updateRestaurantField}
								addMenu={addMenu}
								updateMenuField={updateMenuField}
								removeMenu={removeMenu}
								updateCategoryField={updateCategoryField}
								reorderCategory={reorderCategory}
								addCategory={addCategory}
								removeCategory={removeCategory}
								addDish={addDish}
								updateDishField={updateDishField}
								reorderDish={reorderDish}
								removeDish={removeDish}
								isPublished={isPublished}
								setIsPublished={setIsPublished}
							/>
						)}

						{/* Settings Section */}
						{activeSection === "settings" && (
							<AdminSettings
								selectedRestaurant={safeRestaurant}
								updateRestaurantField={updateRestaurantField}
							/>
						)}
					</div>
				</main>
			</div>
		</div>
	);
}
