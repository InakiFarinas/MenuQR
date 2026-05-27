import { IconCircleCheck, IconPalette } from "@tabler/icons-react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BrandPage({
	selectedRestaurant,
	updateRestaurantField,
	brandColors,
	colorMap,
	onBack,
}) {
	return (
		<div>
			<div className="border-b border-black/5 px-5 py-5 sm:px-6 sm:py-6">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<button
									type="button"
									onClick={onBack}
									className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-950"
								>
									Volver a ajustes
								</button>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Color de marca</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className="mt-4 flex items-center gap-3">
					<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/5 text-gray-900">
						<IconPalette size={18} stroke={1.8} />
					</div>
					<div>
						<h3 className="text-2xl font-semibold text-gray-950 sm:text-3xl">
							Color de marca
						</h3>
						<p className="mt-1 text-sm text-gray-500 sm:text-base">
							Selecciona el color principal que representará tu menú.
						</p>
					</div>
				</div>
			</div>
			<div className="px-5 py-5 sm:px-6 sm:py-6">
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
					{brandColors.map((color) => (
						<button
							key={color.value}
							type="button"
							onClick={() =>
								updateRestaurantField(
									selectedRestaurant.id,
									"accent",
									color.value,
								)
							}
							className={`rounded-2xl border px-4 py-4 text-sm font-medium text-white transition-all ${colorMap[color.value]} ${selectedRestaurant.accent === color.value ? "border-black/30 shadow-lg scale-[1.02]" : "border-transparent hover:scale-[1.02]"}`}
						>
							{color.name}
							{selectedRestaurant.accent === color.value && (
								<span className="ml-2 inline-flex items-center gap-1 text-xs font-semibold">
									<IconCircleCheck size={14} stroke={2} />
									Seleccionado
								</span>
							)}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
