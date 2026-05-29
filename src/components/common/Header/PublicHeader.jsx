import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CategoryNav from "./CategoryNav.jsx";

export default function PublicHeader({
	selectedRestaurant,
	categories = [],
	activeCategory = null,
	onSelectCategory = null,
}) {
	const categoryNavRef = useRef(null);
	const categoryButtonRefs = useRef({});
	const restaurantInitials = selectedRestaurant.name
		.split(" ")
		.map((word) => word[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();
	const heroBackgroundStyle = selectedRestaurant.avatarBackgroundImage
		? {
				backgroundColor: "#000",
				backgroundImage: `linear-gradient(rgba(3, 7, 18, 0.35), rgba(3, 7, 18, 0.65)), url(${selectedRestaurant.avatarBackgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}
		: {
				backgroundColor: "#000",
			};

	return (
		<header className="sticky top-0 z-50 overflow-hidden border-b border-black/5 bg-white/80 text-gray-900 backdrop-blur-xl">
			<div
				className="relative overflow-hidden bg-black text-white"
				style={heroBackgroundStyle}
			>
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.3),rgba(0,0,0,0.7))]" />
				<div className="pointer-events-none absolute -left-20 top-4 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
				<div className="pointer-events-none absolute -right-16 bottom-0 h-44 w-44 rounded-full bg-amber-400/10 blur-3xl" />
				<div className="relative mx-auto max-w-7xl px-4 py-9 text-center sm:px-6 sm:py-12 lg:px-8">
					<div
						className="mx-auto overflow-hidden rounded-full border border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur"
						style={{ width: "5.25rem", height: "5.25rem" }}
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
					{selectedRestaurant.description ? (
						<p className="mx-auto mt-4 max-w-xl text-sm text-gray-300 sm:text-base">
							{selectedRestaurant.description}
						</p>
					) : null}
				</div>
			</div>
			{categories.length > 0 && (
				<div className="border-t border-black/5 bg-white/80 px-0 pb-4 pt-3 text-gray-900">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<CategoryNav
							categories={categories}
							activeCategory={activeCategory}
							onSelectCategory={onSelectCategory}
							categoryNavRef={categoryNavRef}
							categoryButtonRefs={categoryButtonRefs}
							activeClassName="border-gray-950 bg-gray-950 text-white shadow-sm"
							idleClassName="border-black/5 bg-white text-gray-600 hover:border-black/10 hover:bg-black/2 hover:text-gray-950"
						/>
					</div>
				</div>
			)}
		</header>
	);
}
