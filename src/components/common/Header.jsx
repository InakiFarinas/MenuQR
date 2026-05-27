import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { IconChevronRight, IconMenu2, IconX } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header({
	selectedRestaurant,
	categories = [],
	activeCategory = null,
	onSelectCategory = null,
	adminMenuOpen = false,
	onAdminMenuToggle = null,
	adminActiveSection = null,
}) {
	const location = useLocation();
	const isAdmin = location.pathname.startsWith("/admin");
	const categoryNavRef = useRef(null);
	const categoryButtonRefs = useRef({});
	const restaurantInitials = selectedRestaurant.name
		.split(" ")
		.map((word) => word[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();
	const avatarBackgroundStyle = selectedRestaurant.avatarBackgroundImage
		? {
				backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.25), rgba(17, 24, 39, 0.35)), url(${selectedRestaurant.avatarBackgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}
		: {
				backgroundImage:
					"linear-gradient(135deg, rgba(17,24,39,0.95), rgba(75,85,99,0.9))",
			};

	const adminSectionLabels = {
		dashboard: "Inicio",
		chart: "Menus",
		settings: "Ajustes",
	};
	const adminSectionLabel = adminActiveSection
		? adminSectionLabels[adminActiveSection] || adminActiveSection
		: null;

	useEffect(() => {
		if (!activeCategory) return;

		const activeButton = categoryButtonRefs.current[activeCategory];
		if (!activeButton) return;

		activeButton.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		});
	}, [activeCategory]);

	if (!isAdmin) {
		return (
			<header className="sticky top-0 z-50 overflow-hidden border-b border-black/5 bg-white/80 text-gray-900 backdrop-blur-xl">
				<div className="relative overflow-hidden bg-gray-950 text-white">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_34%),linear-gradient(135deg,rgba(17,24,39,0.96),rgba(3,7,18,0.98))]" />
					<div className="pointer-events-none absolute -left-20 top-4 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
					<div className="pointer-events-none absolute -right-16 bottom-0 h-44 w-44 rounded-full bg-amber-400/10 blur-3xl" />
					<div className="relative mx-auto max-w-7xl px-4 py-9 text-center sm:px-6 sm:py-12 lg:px-8">
						<div
							className="mx-auto overflow-hidden rounded-full border border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur"
							style={{
								width: "5.25rem",
								height: "5.25rem",
								...avatarBackgroundStyle,
							}}
						>
							<Avatar className="h-full w-full border-0 bg-transparent">
								<AvatarImage
									src={selectedRestaurant.avatarImage || ""}
									alt={selectedRestaurant.name}
									className="object-cover"
								/>
								<AvatarFallback className="h-full w-full rounded-full bg-white/10 text-sm font-semibold tracking-[0.25em] text-white backdrop-blur-none">
									{restaurantInitials}
								</AvatarFallback>
							</Avatar>
						</div>
						<h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
							{selectedRestaurant.name}
						</h1>
						<p className="mx-auto mt-4 max-w-xl text-sm text-gray-300 sm:text-base">
							{selectedRestaurant.description}
						</p>
					</div>
				</div>
				{categories.length > 0 && (
					<div className="border-t border-black/5 bg-white/80 px-0 pb-4 pt-3 text-gray-900">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div
								ref={categoryNavRef}
								className="overflow-x-auto scrollbar-hide"
							>
								<div className="flex min-w-min gap-2 px-1 py-1">
									{categories.map((category) => (
										<button
											key={category.id}
											ref={(el) => {
												if (el) {
													categoryButtonRefs.current[category.id] = el;
												}
											}}
											onClick={() => {
												if (onSelectCategory) {
													onSelectCategory(category.id);
												}
												const element = document.getElementById(
													`category-${category.id}`,
												);
												if (element) {
													element.scrollIntoView({ behavior: "smooth" });
												}
											}}
											className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
												category.id === activeCategory
													? "border-gray-950 bg-gray-950 text-white shadow-sm"
													: "border-black/5 bg-white text-gray-600 hover:border-black/10 hover:bg-black/2 hover:text-gray-950"
											}`}
										>
											<IconChevronRight
												size={14}
												stroke={2}
												className="opacity-70"
											/>
											{category.name}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				)}
			</header>
		);
	}
	return (
		<header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 text-gray-900 backdrop-blur-xl">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between gap-4 py-4 sm:py-5">
					<div className="min-w-0">
						<div className="flex flex-wrap items-center gap-2 sm:gap-3">
							<h1 className="truncate text-2xl font-semibold text-gray-950 sm:text-3xl">
								{adminSectionLabel
									? adminSectionLabel
									: selectedRestaurant.name}
							</h1>
							<span className="hidden h-6 w-px bg-black/10 sm:block" />
						</div>
					</div>
					{isAdmin && onAdminMenuToggle && (
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

				{!isAdmin && categories.length > 0 && (
					<div className="pb-4">
						<div
							ref={categoryNavRef}
							className="overflow-x-auto scrollbar-hide"
						>
							<div className="flex min-w-min gap-2 px-1 py-1">
								{categories.map((category) => (
									<button
										key={category.id}
										ref={(el) => {
											if (el) {
												categoryButtonRefs.current[category.id] = el;
											}
										}}
										onClick={() => {
											if (onSelectCategory) {
												onSelectCategory(category.id);
											}
											const element = document.getElementById(
												`category-${category.id}`,
											);
											if (element) {
												element.scrollIntoView({ behavior: "smooth" });
											}
										}}
										className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
											category.id === activeCategory
												? "border-black/10 bg-gray-950 text-white shadow-sm"
												: "border-black/5 bg-white text-gray-600 hover:border-black/10 hover:bg-black/2 hover:text-gray-950"
										}`}
									>
										<IconChevronRight
											size={14}
											stroke={2}
											className="opacity-70"
										/>
										{category.name}
									</button>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
