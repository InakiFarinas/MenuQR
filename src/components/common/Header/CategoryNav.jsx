import { useEffect } from "react";
import { IconChevronRight } from "@tabler/icons-react";

export default function CategoryNav({
	categories,
	activeCategory,
	onSelectCategory,
	categoryNavRef,
	categoryButtonRefs,
	activeClassName,
	idleClassName,
}) {
	useEffect(() => {
		if (!activeCategory) return;

		const activeButton = categoryButtonRefs.current[activeCategory];
		if (!activeButton) return;

		activeButton.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		});
	}, [activeCategory, categoryButtonRefs]);

	if (categories.length === 0) return null;

	return (
		<div ref={categoryNavRef} className="overflow-x-auto scrollbar-hide">
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
							category.id === activeCategory ? activeClassName : idleClassName
						}`}
					>
						<IconChevronRight size={14} stroke={2} className="opacity-70" />
						{category.name}
					</button>
				))}
			</div>
		</div>
	);
}
