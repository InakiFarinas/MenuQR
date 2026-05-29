import { Header, DishCard } from "../components";
import usePublicMenuNavigation from "../hooks/usePublicMenuNavigation.js";
import { useEffect } from "react";
import { registerScan } from "../services/scanService.js";

export default function PublicMenuPage({
	selectedRestaurant,
	selectedMenuSlug,
}) {
	useEffect(() => {
		if (selectedRestaurant?.id) {
			registerScan(selectedRestaurant.id);
		}
	}, [selectedRestaurant?.id]);
	const { categories, activeCategory, setActiveCategory, mainContentRef } =
		usePublicMenuNavigation(selectedRestaurant, selectedMenuSlug);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header con navegación sticky a categorías */}
			<Header
				selectedRestaurant={selectedRestaurant}
				categories={categories}
				activeCategory={activeCategory}
				onSelectCategory={setActiveCategory}
			/>

			{/* Main Content */}
			<main
				ref={mainContentRef}
				className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8"
			>
				{categories.length > 0 ? (
					<>
						{categories.map((category) => (
							<section
								key={category.id}
								id={`category-${category.id}`}
								className="mb-12 sm:mb-16 scroll-mt-48"
							>
								{/* Category Info */}
								<div className="mb-6 sm:mb-8">
									<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
										{category.name}
									</h2>
									{category.description && (
										<p className="text-gray-600 text-sm sm:text-base">
											{category.description}
										</p>
									)}
								</div>

								{/* Dishes Grid */}
								{category.dishes.length > 0 ? (
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
										{category.dishes.map((dish) => (
											<DishCard
												key={dish.id}
												dish={dish}
												isActive={dish.available !== false}
												accentColor={selectedRestaurant.accent}
											/>
										))}
									</div>
								) : (
									<div className="text-center py-8 sm:py-12">
										<p className="text-gray-500 text-sm sm:text-base">
											No hay platos en esta categoría
										</p>
									</div>
								)}
							</section>
						))}
					</>
				) : (
					<div className="text-center py-12 sm:py-16">
						<p className="text-gray-500 text-lg">
							Aún no hay categorías en el menú
						</p>
					</div>
				)}
			</main>

			{/* Footer */}
			<footer className="bg-gray-100 border-t border-gray-200 sm:mt-16">
				<div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center">
					<p className="text-gray-600 text-sm sm:text-base">
						{selectedRestaurant.name} • {selectedRestaurant.city}
					</p>
					<p className="text-gray-500 text-xs mt-2">Powered by MenuQR</p>
				</div>
			</footer>
		</div>
	);
}
