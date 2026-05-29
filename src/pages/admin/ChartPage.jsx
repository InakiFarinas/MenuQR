import { Outlet, useParams } from "react-router-dom";
import DishEditModal from "../../components/admin/DishEditModal.jsx";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal.jsx";
import useAdminChartFlow from "../../hooks/useAdminChartFlow.js";
import useSelectedRestaurant from "../../hooks/useSelectedRestaurant.js";
import { useAdmin } from "../../contexts/useAdmin.js";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ChartPage() {
	const { selected: selectedRestaurant } = useSelectedRestaurant();
	const admin = useAdmin();
	const { menuSlug, categorySlug } = useParams();
	const activeMenu = selectedRestaurant?.menus?.find(
		(m) => m.slug === menuSlug,
	);
	const activeCategory = activeMenu?.categories?.find(
		(c) => c.slug === categorySlug,
	);

	const {
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
		updateDishField: admin.updateDishField,
		removeMenu: admin.removeMenu,
		removeCategory: admin.removeCategory,
		removeDish: admin.removeDish,
	});

	return (
		<div className="bg-gray-50 min-h-screen p-4 text-gray-900">
			<div className="mb-4">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<button
									type="button"
									onClick={handleBackFromCategories}
									className="text-sm text-gray-600"
								>
									Menús
								</button>
							</BreadcrumbLink>
						</BreadcrumbItem>

						{activeMenu && (
							<>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									{activeCategory ? (
										<BreadcrumbLink asChild>
											<button
												type="button"
												onClick={() => handleSelectMenu(menuSlug)}
												className="text-sm text-gray-600"
											>
												{activeMenu.name}
											</button>
										</BreadcrumbLink>
									) : (
										<BreadcrumbPage>{activeMenu.name}</BreadcrumbPage>
									)}
								</BreadcrumbItem>
							</>
						)}

						{activeCategory && (
							<>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>{activeCategory.name}</BreadcrumbPage>
								</BreadcrumbItem>
							</>
						)}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<Outlet
				context={{
					selectedRestaurant,
					admin,
					menuSlug,
					categorySlug,
					handleSelectMenu,
					handleSelectCategory,
					handleBackFromCategories,
					handleBackFromDishes,
					handleEditDish,
					handleDeleteMenu,
					handleDeleteCategory,
				}}
			/>

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
