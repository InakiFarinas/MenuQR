import { IconAlertCircle, IconCreditCard } from "@tabler/icons-react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PricingInteraction } from "@/components/ui/pricing-interaction";

export default function BillingPage({ onBack }) {
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
							Consulta el estado de tu plan y los datos de facturación.
						</p>
					</div>
				</div>
			</div>
			<div className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
				<div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
					<PricingInteraction
						starterMonth={4.99}
						starterAnnual={49.99}
						proMonth={9.99}
						proAnnual={99.99}
					/>

					<div className="rounded-[1.25rem] border border-black/5 bg-white p-4 sm:p-6">
						<h4 className="mb-4 text-xl text-gray-950">
							Información de facturación
						</h4>
						<div className="mb-6 space-y-3 text-sm">
							<div>
								<p className="text-gray-600">Próximo pago</p>
								<p className="mt-1 text-gray-950">
									15 de {new Date().toLocaleString("es-ES", { month: "long" })}
								</p>
							</div>
							<div>
								<p className="text-gray-600">Método de pago</p>
								<p className="mt-1 text-gray-950">Tarjeta terminada en 4242</p>
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
