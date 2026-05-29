import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Header, AdminHamburgerMenu } from "../components";
import useAuth from "../hooks/useAuth.js";

export default function AdminPage({ selectedRestaurant }) {
	const { signOut } = useAuth();

	const [adminMenuOpen, setAdminMenuOpen] = useState(false);

	const location = useLocation();
	const parts = location.pathname.split("/").filter(Boolean);
	const adminActiveSection = parts[2] || "dashboard";

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header con hamburger menu a la derecha */}
			<Header
				selectedRestaurant={selectedRestaurant}
				categories={[]}
				adminMenuOpen={adminMenuOpen}
				onAdminMenuToggle={() => setAdminMenuOpen(!adminMenuOpen)}
				adminActiveSection={adminActiveSection}
			/>

			{/* Layout con Hamburger Menu/Sidebar */}
			<div className="flex flex-col lg:flex-row">
				{/* Hamburger Menu/Sidebar */}
				<AdminHamburgerMenu
					selectedSlug={selectedRestaurant?.slug}
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
