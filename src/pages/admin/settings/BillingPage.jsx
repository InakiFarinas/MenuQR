import { useEffect, useMemo, useState } from "react";
import {
	IconAlertCircle,
	IconCreditCard,
	IconLoader2,
} from "@tabler/icons-react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchPlans } from "../../../services/plansService.js";
import { formatCurrency } from "../../../utils/menu.js";

export default function BillingPage({ selectedRestaurant, onBack }) {
	const [plans, setPlans] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let mounted = true;

		fetchPlans()
			.then((data) => {
				if (!mounted) return;
				setPlans(data);
			})
			.catch(() => {
				if (!mounted) return;
				setPlans([]);
			})
			.finally(() => {
				if (!mounted) return;
				setIsLoading(false);
			});

		return () => {
			mounted = false;
		};
	}, []);

	const activePlan = useMemo(
		() =>
			plans.find((plan) => plan.id === selectedRestaurant?.planId) ?? plans[0],
		[plans, selectedRestaurant?.planId],
	);

	const nextPaymentMonth = useMemo(() => {
		const date = new Date();
		date.setDate(15);
		return new Intl.DateTimeFormat("es-ES", {
			month: "long",
		}).format(date);
	}, []);

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
							<BreadcrumbPage>Plan y pago</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className="mt-4 flex items-center gap-3">
					<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/5 text-gray-900">
						<IconCreditCard size={18} stroke={1.8} />
					</div>
					<div>
						<h3 className="text-2xl font-semibold text-gray-950 sm:text-3xl">
							Plan y pago
						</h3>
						<p className="mt-1 text-sm text-gray-500 sm:text-base">
							Consulta y compara los planes guardados en la base de datos.
						</p>
					</div>
				</div>
			</div>

			<div className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
				<div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
					<div className="rounded-[1.25rem] border border-black/5 bg-white p-4 sm:p-6">
						<div className="mb-4 flex items-center justify-between gap-3">
							<div>
								<h4 className="text-xl text-gray-950">Planes disponibles</h4>
								<p className="mt-1 text-sm text-gray-500">
									Planes obtenidos desde `planes`.
								</p>
							</div>
							{isLoading && (
								<div className="inline-flex items-center gap-2 text-sm text-gray-500">
									<IconLoader2 size={16} className="animate-spin" />
									Cargando
								</div>
							)}
						</div>

						<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
							{plans.map((plan) => {
								const isActive = plan.id === activePlan?.id;
								const maxMenus =
									plan.max_menues < 0 ? "Ilimitados" : plan.max_menues;

								return (
									<div
										key={plan.id}
										className={`rounded-3xl border p-4 transition ${isActive ? "border-gray-950 bg-gray-950 text-white shadow-lg" : "border-black/5 bg-gray-50 text-gray-950"}`}
									>
										<div className="flex items-start justify-between gap-3">
											<div>
												<p
													className={`text-sm font-medium ${isActive ? "text-white/70" : "text-gray-500"}`}
												>
													Plan
												</p>
												<h5 className="mt-1 text-xl font-semibold">
													{plan.nombre}
												</h5>
											</div>
											{isActive && (
												<span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">
													Actual
												</span>
											)}
										</div>
										<div className="mt-6 space-y-2">
											<p
												className={`text-3xl font-semibold ${isActive ? "text-white" : "text-gray-950"}`}
											>
												{formatCurrency(plan.precio_mensual)}/mes
											</p>
											<p
												className={`text-sm ${isActive ? "text-white/70" : "text-gray-500"}`}
											>
												{maxMenus} menús
											</p>
										</div>
										<button
											type="button"
											className={`mt-5 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-white text-gray-950" : "bg-gray-950 text-white hover:bg-gray-800"}`}
										>
											{isActive ? "Plan actual" : "Cambiar a este plan"}
										</button>
									</div>
								);
							})}
						</div>
					</div>

					<div className="rounded-[1.25rem] border border-black/5 bg-white p-4 sm:p-6">
						<h4 className="mb-4 text-xl text-gray-950">
							Información de facturación
						</h4>
						<div className="mb-6 space-y-3 text-sm">
							<div>
								<p className="text-gray-600">Restaurante</p>
								<p className="mt-1 text-gray-950">
									{selectedRestaurant?.name ?? "-"}
								</p>
							</div>
							<div>
								<p className="text-gray-600">Plan actual</p>
								<p className="mt-1 text-gray-950">
									{activePlan?.nombre ?? "Sin plan asignado"}
								</p>
							</div>
							<div>
								<p className="text-gray-600">Próximo pago</p>
								<p className="mt-1 text-gray-950">15 de {nextPaymentMonth}</p>
							</div>
							<div>
								<p className="text-gray-600">Estado</p>
								<p className="mt-1 text-emerald-600">Activo</p>
							</div>
						</div>
						<div className="space-y-2">
							<button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-gray-950 transition hover:bg-black/3">
								<IconCreditCard size={16} stroke={1.8} />
								Cambiar método de pago
							</button>
							<button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100">
								<IconAlertCircle size={16} stroke={1.8} />
								Cancelar suscripción
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
