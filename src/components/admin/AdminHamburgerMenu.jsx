import {
	IconChevronRight,
	IconLayoutDashboard,
	IconMenuOrder,
	IconSettings2,
} from "@tabler/icons-react";

export default function AdminHamburgerMenu({
	activeSection,
	setActiveSection,
	isOpen,
}) {
	const sections = [
		{ id: "dashboard", label: "Inicio", icon: IconLayoutDashboard },
		{ id: "chart", label: "Carta", icon: IconMenuOrder },
		{ id: "settings", label: "Ajustes", icon: IconSettings2 },
	];

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
						{sections.map((section) => {
							const SectionIcon = section.icon;

							return (
								<button
									key={section.id}
									onClick={() => setActiveSection(section.id)}
									className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all ${
										activeSection === section.id
											? "border-black/10 bg-gray-950 text-white shadow-sm"
											: "border-black/5 bg-white text-gray-700 hover:border-black/10 hover:bg-black/2 hover:text-gray-950"
									}`}
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
								</button>
							);
						})}
					</nav>
				</div>
			</aside>

			{isOpen && (
				<div className="fixed inset-0 z-20 bg-black/30 backdrop-blur-[2px] lg:hidden" />
			)}
		</>
	);
}
