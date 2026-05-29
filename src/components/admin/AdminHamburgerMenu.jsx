import {
	IconChevronRight,
	IconLayoutDashboard,
	IconMenuOrder,
	IconSettings2,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

const SECTIONS = [
	{
		id: "dashboard",
		label: "Inicio",
		icon: IconLayoutDashboard,
		to: "dashboard",
	},
	{ id: "chart", label: "Carta", icon: IconMenuOrder, to: "chart" },
	{ id: "settings", label: "Ajustes", icon: IconSettings2, to: "settings" },
];

export default function AdminHamburgerMenu({ selectedSlug, isOpen, onLogout }) {
	return (
		<>
			<aside
				className={`fixed left-0 z-30 h-full border-r border-black/5 bg-white/90 backdrop-blur-xl transition-all duration-300 lg:static lg:h-auto ${
					isOpen
						? "w-72 shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
						: "w-0 overflow-hidden lg:w-72"
				}`}
			>
				<div className="p-4 sm:p-6">
					<nav className="space-y-2">
						{SECTIONS.map((section) => {
							const SectionIcon = section.icon;
							const to = `/admin/${selectedSlug}/${section.to}`;

							return (
								<NavLink
									key={section.id}
									to={to}
									className={({ isActive }) =>
										`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all ${
											isActive
												? "border-black/10 bg-gray-950 text-white shadow-sm"
												: "border-black/5 bg-white text-gray-700 hover:border-black/10 hover:bg-black/2 hover:text-gray-950"
										}`
									}
								>
									<span className="flex items-center gap-3">
										<SectionIcon size={18} stroke={1.8} />
										{section.label}
									</span>
									<IconChevronRight
										size={16}
										stroke={1.8}
										className="opacity-60"
									/>
								</NavLink>
							);
						})}
					</nav>

					<button
						type="button"
						onClick={onLogout}
						className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100"
					>
						Cerrar sesión
					</button>
				</div>
			</aside>

			{isOpen && (
				<div className="fixed inset-0 z-20 bg-black/30 backdrop-blur-[2px] lg:hidden" />
			)}
		</>
	);
}
