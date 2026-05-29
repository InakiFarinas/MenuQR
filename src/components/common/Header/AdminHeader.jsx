import { IconMenu2, IconX } from "@tabler/icons-react";

export default function AdminHeader({
	adminMenuOpen = false,
	onAdminMenuToggle = null,
	adminActiveSection = null,
}) {
	const adminSectionLabels = {
		dashboard: "Inicio",
		chart: "Menus",
		settings: "Ajustes",
	};
	const adminSectionLabel = adminActiveSection
		? adminSectionLabels[adminActiveSection] || adminActiveSection
		: null;

	return (
		<header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 text-gray-900 backdrop-blur-xl">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between gap-4 py-4 sm:py-5">
					<div className="min-w-0">
						<div className="flex flex-wrap items-center gap-2 sm:gap-3">
							<h1 className="truncate text-2xl font-semibold text-gray-950 sm:text-3xl">
								{adminSectionLabel}
							</h1>
						</div>
					</div>
					{onAdminMenuToggle && (
						<button
							onClick={onAdminMenuToggle}
							className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-gray-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md lg:hidden"
							aria-label="Toggle menu"
						>
							{adminMenuOpen ? (
								<IconX size={20} stroke={1.8} />
							) : (
								<IconMenu2 size={20} stroke={1.8} />
							)}
						</button>
					)}
				</div>
			</div>
		</header>
	);
}
