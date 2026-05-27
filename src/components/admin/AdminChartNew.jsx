import AdminMenusList from "./AdminMenusList.jsx";
import AdminCategoriesList from "./AdminCategoriesList.jsx";
import AdminDishesList from "./AdminDishesList.jsx";
import DishEditModal from "./DishEditModal.jsx";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal.jsx";
import useAdminChartFlow from "../../hooks/useAdminChartFlow.js";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AdminChartNew({
	selectedRestaurant,
	activeMenuId,
	setActiveMenuId,
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
}) {
	const {
		screen,
		activeCategoryId,
		editingDish,
		deleteConfirm,
		handleSelectMenu,
		handleSelectCategory,
		handleBackFromCategories,
		handleBackFromDishes,
		handleEditDish,
		handleSaveDish,
		handleDeleteDish,
		handleDeleteMenu,
		handleDeleteCategory,
		confirmDelete,
		clearEditingDish,
		clearDeleteConfirm,
	} = useAdminChartFlow({
		selectedRestaurant,
		activeMenuId,
		setActiveMenuId,
		updateDishField,
		removeMenu,
		removeCategory,
		removeDish,
	});

	return (
		<div className="bg-gray-50 min-h-screen p-4 text-gray-900">
			{/* Breadcrumb flow: Menús -> [Menu] -> [Category] */}
			<div className="mb-4">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<button
									type="button"
									onClick={() => {
										// go back to menus
										handleBackFromCategories();
									}}
									className="text-sm text-gray-600"
								>
									Menús
								</button>
							</BreadcrumbLink>
						</BreadcrumbItem>
						{screen !== "menus" && <BreadcrumbSeparator />}
						{screen === "categories" && (
							<>
								<BreadcrumbItem>
									<BreadcrumbPage>
										{selectedRestaurant.menus.find((m) => m.id === activeMenuId)
											?.name || "Carta"}
									</BreadcrumbPage>
								</BreadcrumbItem>
							</>
						)}
						{screen === "dishes" && (
							<>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<button
											type="button"
											onClick={() => handleSelectMenu(activeMenuId)}
											className="text-sm text-gray-600"
										>
											{selectedRestaurant.menus.find(
												(m) => m.id === activeMenuId,
											)?.name || "Carta"}
										</button>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>
										{selectedRestaurant.menus
											.find((m) => m.id === activeMenuId)
											?.categories.find((c) => c.id === activeCategoryId)
											?.name || "Categoría"}
									</BreadcrumbPage>
								</BreadcrumbItem>
							</>
						)}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			{screen === "menus" && (
				<AdminMenusList
					restaurant={selectedRestaurant}
					onSelectMenu={handleSelectMenu}
					onAddMenu={() => addMenu(selectedRestaurant.id, setActiveMenuId)}
					updateMenuField={updateMenuField}
					removeMenu={handleDeleteMenu}
				/>
			)}

			{screen === "categories" && (
				<AdminCategoriesList
					restaurant={selectedRestaurant}
					activeMenuId={activeMenuId}
					onSelectCategory={handleSelectCategory}
					onBack={handleBackFromCategories}
					addCategory={addCategory}
					removeCategory={handleDeleteCategory}
					updateCategoryField={updateCategoryField}
					reorderCategory={reorderCategory}
					updateMenuField={updateMenuField}
				/>
			)}

			{screen === "dishes" && (
				<AdminDishesList
					restaurant={selectedRestaurant}
					activeMenuId={activeMenuId}
					activeCategoryId={activeCategoryId}
					onBack={handleBackFromDishes}
					onEditDish={handleEditDish}
					addDish={addDish}
					updateDishField={updateDishField}
					reorderDish={reorderDish}
					removeDish={removeDish}
				/>
			)}

			{editingDish && (
				<DishEditModal
					dish={editingDish}
					onClose={clearEditingDish}
					onSave={handleSaveDish}
					onDelete={handleDeleteDish}
				/>
			)}

			<ConfirmDeleteModal
				isOpen={!!deleteConfirm}
				onConfirm={confirmDelete}
				onCancel={clearDeleteConfirm}
				title="Confirmar eliminación"
				message="¿Estás seguro de que deseas eliminar esto? Esta acción no se puede deshacer."
			/>
		</div>
	);
}
