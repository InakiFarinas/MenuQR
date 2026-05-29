import {
	IconCalendarStats,
	IconChartBar,
	IconCircleCheck,
	IconCircleX,
	IconDatabase,
	IconLayoutGrid,
	IconLoader2,
	IconMapPin,
	IconQrcode,
	IconSparkles,
} from "@tabler/icons-react";
import useSelectedRestaurant from "../../hooks/useSelectedRestaurant.js";
import useScanMetrics from "../../hooks/useScanMetrics.js";

const StatCard = ({
	title,
	value,
	subtitle,
	icon: Icon,
	tone = "gray",
	isLoading = false,
}) => {
	const toneClasses = {
		gray: "bg-gray-950 text-white",
		blue: "bg-blue-600 text-white",
		emerald: "bg-emerald-600 text-white",
		amber: "bg-amber-500 text-white",
	};

	return (
		<div className="rounded-3xl border border-black/5 bg-white/85 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
						{title}
					</p>
					<p className="mt-3 text-3xl font-semibold text-gray-950 sm:text-4xl">
						{isLoading ? (
							<IconLoader2 size={28} className="animate-spin text-gray-300" />
						) : (
							value
						)}
					</p>
					{subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
				</div>
				<div className={`rounded-2xl p-3 ${toneClasses[tone]}`}>
					<Icon size={20} stroke={1.8} />
				</div>
			</div>
		</div>
	);
};

export default function DashboardPage() {
	const { selected: selectedRestaurant } = useSelectedRestaurant();
	const menus = selectedRestaurant?.menus || [];
	const activeMenu = menus.find((m) => m.isActive) || menus[0];
	const categories = activeMenu?.categories || [];

	const { metrics: scanMetrics, isLoading: scansLoading } = useScanMetrics(
		selectedRestaurant?.id,
	);

	const dishMetrics = {
		activeDishes: categories.reduce(
			(sum, cat) => sum + cat.dishes.filter((d) => d.available).length,
			0,
		),
		unavailableDishes: categories.reduce(
			(sum, cat) => sum + cat.dishes.filter((d) => !d.available).length,
			0,
		),
		totalDishes: categories.reduce((sum, cat) => sum + cat.dishes.length, 0),
	};

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-3xl text-gray-950 sm:text-4xl">Análisis</h2>
				<p className="mt-2 max-w-2xl text-gray-600">
					Resumen del desempeño de {selectedRestaurant.name}
				</p>
			</div>

			<div>
				<div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
					<IconQrcode size={14} stroke={1.8} />
					Escaneos QR
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<StatCard
						title="Hoy"
						value={scanMetrics.today}
						subtitle="escaneos"
						icon={IconChartBar}
						tone="gray"
						isLoading={scansLoading}
					/>
					<StatCard
						title="Esta Semana"
						value={scanMetrics.week}
						subtitle="escaneos"
						icon={IconCalendarStats}
						tone="blue"
						isLoading={scansLoading}
					/>
					<StatCard
						title="Este Mes"
						value={scanMetrics.month}
						subtitle="escaneos"
						icon={IconSparkles}
						tone="amber"
						isLoading={scansLoading}
					/>
				</div>
			</div>

			<div>
				<div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
					<IconLayoutGrid size={14} stroke={1.8} />
					Estado de platos
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<StatCard
						title="Total de Platos"
						value={dishMetrics.totalDishes}
						icon={IconDatabase}
						tone="gray"
					/>
					<StatCard
						title="Platos Activos"
						value={dishMetrics.activeDishes}
						subtitle="disponibles"
						icon={IconCircleCheck}
						tone="emerald"
					/>
					<StatCard
						title="Agotados"
						value={dishMetrics.unavailableDishes}
						subtitle="no disponibles"
						icon={IconCircleX}
						tone="amber"
					/>
				</div>
			</div>

			<div className="rounded-3xl border border-black/5 bg-white/85 p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
				<div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
					<IconMapPin size={14} stroke={1.8} />
					Información del local
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
							Nombre del local
						</p>
						<p className="mt-2 text-lg text-gray-950">
							{selectedRestaurant.name}
						</p>
					</div>
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
							Ubicación
						</p>
						<p className="mt-2 text-lg text-gray-950">
							{selectedRestaurant.city}
						</p>
					</div>
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
							Categorías
						</p>
						<p className="mt-2 text-lg text-gray-950">{categories.length}</p>
					</div>
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
							QR slug
						</p>
						<p className="mt-2 break-all text-lg text-gray-950">
							{selectedRestaurant.slug}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
