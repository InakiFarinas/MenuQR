import { IconFileText } from "@tabler/icons-react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function InvoicesPage({ onBack }) {
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
							<BreadcrumbPage>Historial de facturas</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className="mt-4 flex items-center gap-3">
					<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/5 text-gray-900">
						<IconFileText size={18} stroke={1.8} />
					</div>
					<div>
						<h3 className="text-2xl font-semibold text-gray-950 sm:text-3xl">
							Historial de facturas
						</h3>
						<p className="mt-1 text-sm text-gray-500 sm:text-base">
							Descarga y revisa tus pagos anteriores.
						</p>
					</div>
				</div>
			</div>
			<div className="px-5 py-5 sm:px-6 sm:py-6">
				<div className="overflow-x-auto rounded-[1.25rem] border border-black/5 bg-white">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-black/5 bg-black/2">
								<th className="py-3 pl-4 text-left font-medium text-gray-600 sm:pl-5">
									Fecha
								</th>
								<th className="py-3 text-left font-medium text-gray-600">
									Descripción
								</th>
								<th className="py-3 text-right font-medium text-gray-600">
									Monto
								</th>
								<th className="py-3 pr-4 text-center font-medium text-gray-600 sm:pr-5">
									Acción
								</th>
							</tr>
						</thead>
						<tbody>
							{[
								{
									date: "15 Ene 2025",
									desc: "Suscripción Premium",
									amount: "$9.99",
								},
								{
									date: "15 Dic 2024",
									desc: "Suscripción Premium",
									amount: "$9.99",
								},
								{
									date: "15 Nov 2024",
									desc: "Suscripción Premium",
									amount: "$9.99",
								},
							].map((invoice, idx) => (
								<tr
									key={idx}
									className="border-b border-black/5 last:border-0 hover:bg-black/2"
								>
									<td className="py-4 pl-4 text-gray-950 sm:pl-5">
										{invoice.date}
									</td>
									<td className="py-4 text-gray-950">{invoice.desc}</td>
									<td className="py-4 text-right font-medium text-gray-950">
										{invoice.amount}
									</td>
									<td className="py-4 pr-4 text-center sm:pr-5">
										<button className="text-sm font-medium text-gray-700 hover:text-gray-950">
											Descargar
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
