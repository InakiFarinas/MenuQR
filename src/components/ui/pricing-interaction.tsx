import NumberFlow from "@number-flow/react";
import React from "react";
import { IconCircleCheck } from "@tabler/icons-react";

export function PricingInteraction({
	starterMonth,
	starterAnnual,
	proMonth,
	proAnnual,
}: {
	starterMonth: number;
	starterAnnual: number;
	proMonth: number;
	proAnnual: number;
}) {
	const [active, setActive] = React.useState(0);
	const [period, setPeriod] = React.useState(0);
	const handleChangePlan = (index: number) => {
		setActive(index);
	};
	const handleChangePeriod = (index: number) => {
		setPeriod(index);
		if (index === 0) {
			setStarter(starterMonth);
			setPro(proMonth);
		} else {
			setStarter(starterAnnual);
			setPro(proAnnual);
		}
	};
	const [starter, setStarter] = React.useState(starterMonth);
	const [pro, setPro] = React.useState(proMonth);

	const plans = [
		{
			name: "Free",
			description: "Para probar el menú y publicar una carta simple.",
			price: "$0.00",
			period: "/mes",
			features: ["1 menú público", "Hasta 3 categorías", "Soporte básico"],
		},
		{
			name: "Starter",
			description: "Ideal para locales pequeños con una presencia cuidada.",
			price: starter,
			period: period === 0 ? "/mes" : "/año",
			features: [
				"Menús y categorías ilimitadas",
				"Personalización de marca",
				"Analíticas básicas",
			],
		},
		{
			name: "Pro",
			description: "Para restaurantes que necesitan más control y crecimiento.",
			price: pro,
			period: period === 0 ? "/mes" : "/año",
			features: [
				"Todo lo de Starter",
				"Analíticas avanzadas",
				"Prioridad en soporte",
			],
		},
	];

	const featureIcon = (
		<IconCircleCheck size={16} stroke={1.8} className="text-emerald-600" />
	);

	return (
		<div className="w-full rounded-[32px] border-2 border-black/10 bg-white p-3 shadow-md">
			<div className="rounded-full relative mb-4 w-full bg-slate-100 p-1.5 flex items-center">
				<button
					type="button"
					className="font-semibold rounded-full w-full p-1.5 text-slate-800 z-20"
					onClick={() => handleChangePeriod(0)}
				>
					Mensual
				</button>
				<button
					type="button"
					className="font-semibold rounded-full w-full p-1.5 text-slate-800 z-20"
					onClick={() => handleChangePeriod(1)}
				>
					Anual
				</button>
				<div
					className="p-1.5 flex items-center justify-center absolute inset-0 w-1/2 z-10"
					style={{
						transform: `translateX(${period * 100}%)`,
						transition: "transform 0.3s",
					}}
				>
					<div className="bg-white shadow-sm rounded-full w-full h-full"></div>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
				<div
					className="group relative flex cursor-pointer flex-col rounded-2xl border-2 border-gray-200 p-4 transition hover:border-gray-400 hover:bg-gray-50"
					onClick={() => handleChangePlan(0)}
				>
					<div className="mb-4 flex items-start justify-between gap-3">
						<div>
							<p className="text-xl font-semibold text-gray-950">Free</p>
							<p className="mt-1 text-sm text-gray-500">
								{plans[0].description}
							</p>
						</div>
					</div>
					<div className="mb-4 flex items-end gap-1">
						<span className="text-3xl font-semibold text-gray-950">$0.00</span>
						<span className="pb-1 text-sm text-gray-500">
							{plans[0].period}
						</span>
					</div>
					<ul className="mb-5 space-y-2 text-sm text-gray-700">
						{plans[0].features.map((feature) => (
							<li key={feature} className="flex items-start gap-2">
								{featureIcon}
								<span>{feature}</span>
							</li>
						))}
					</ul>
					<button
						type="button"
						className={`mt-auto rounded-full px-4 py-3 text-sm font-medium transition ${active === 0 ? "bg-black text-white" : "bg-gray-100 text-gray-900 group-hover:bg-gray-200"}`}
					>
						{active === 0 ? "Plan elegido" : "Elegir Free"}
					</button>
				</div>
				<div
					className="group relative flex cursor-pointer flex-col rounded-2xl border-2 border-gray-900 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-50"
					onClick={() => handleChangePlan(1)}
				>
					<div className="mb-4 flex items-start justify-between gap-3">
						<div>
							<p className="flex items-center gap-2 text-xl font-semibold text-gray-950">
								Starter
								<span className="rounded-lg bg-yellow-100 px-2 py-1 text-sm text-yellow-950">
									Popular
								</span>
							</p>
							<p className="mt-1 text-sm text-gray-500">
								{plans[1].description}
							</p>
						</div>
					</div>
					<div className="mb-4 flex items-end gap-1">
						<span className="text-3xl font-semibold text-gray-950">
							${" "}
							<NumberFlow
								className="text-3xl font-semibold text-gray-950"
								value={starter}
							/>
						</span>
						<span className="pb-1 text-sm text-gray-500">
							{plans[1].period}
						</span>
					</div>
					<ul className="mb-5 space-y-2 text-sm text-gray-700">
						{plans[1].features.map((feature) => (
							<li key={feature} className="flex items-start gap-2">
								{featureIcon}
								<span>{feature}</span>
							</li>
						))}
					</ul>
					<button
						type="button"
						className={`mt-auto rounded-full px-4 py-3 text-sm font-medium transition ${active === 1 ? "bg-black text-white" : "bg-gray-100 text-gray-900 group-hover:bg-gray-200"}`}
					>
						{active === 1 ? "Plan elegido" : "Elegir Starter"}
					</button>
				</div>
				<div
					className="group relative flex cursor-pointer flex-col rounded-2xl border-2 border-gray-200 p-4 transition hover:border-gray-400 hover:bg-gray-50"
					onClick={() => handleChangePlan(2)}
				>
					<div className="mb-4 flex items-start justify-between gap-3">
						<div>
							<p className="text-xl font-semibold text-gray-950">Pro</p>
							<p className="mt-1 text-sm text-gray-500">
								{plans[2].description}
							</p>
						</div>
					</div>
					<div className="mb-4 flex items-end gap-1">
						<span className="text-3xl font-semibold text-gray-950">
							${" "}
							<NumberFlow
								className="text-3xl font-semibold text-gray-950"
								value={pro}
							/>
						</span>
						<span className="pb-1 text-sm text-gray-500">
							{plans[2].period}
						</span>
					</div>
					<ul className="mb-5 space-y-2 text-sm text-gray-700">
						{plans[2].features.map((feature) => (
							<li key={feature} className="flex items-start gap-2">
								{featureIcon}
								<span>{feature}</span>
							</li>
						))}
					</ul>
					<button
						type="button"
						className={`mt-auto rounded-full px-4 py-3 text-sm font-medium transition ${active === 2 ? "bg-black text-white" : "bg-gray-100 text-gray-900 group-hover:bg-gray-200"}`}
					>
						{active === 2 ? "Plan elegido" : "Elegir Pro"}
					</button>
				</div>
			</div>
			<button
				type="button"
				className="mt-4 w-full rounded-full bg-black p-3 text-lg text-white transition-transform duration-300 active:scale-95"
			>
				Get Started
			</button>
		</div>
	);
}
