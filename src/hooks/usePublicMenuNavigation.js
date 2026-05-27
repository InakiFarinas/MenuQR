import { useEffect, useMemo, useRef, useState } from "react";

export default function usePublicMenuNavigation(
	selectedRestaurant,
	selectedMenuSlug,
) {
	const menus = selectedRestaurant?.menus || [];
	const activeMenu = selectedMenuSlug
		? menus.find((menu) => menu.slug === selectedMenuSlug) || menus[0]
		: menus.find((menu) => menu.isActive) || menus[0];
	const categories = useMemo(() => activeMenu?.categories || [], [activeMenu]);
	const [selectedCategory, setSelectedCategory] = useState(
		categories[0]?.id || null,
	);
	const mainContentRef = useRef(null);

	const activeCategory = useMemo(() => {
		if (
			selectedCategory &&
			categories.some((category) => category.id === selectedCategory)
		) {
			return selectedCategory;
		}

		return categories[0]?.id || null;
	}, [categories, selectedCategory]);

	useEffect(() => {
		const handleScroll = () => {
			if (!mainContentRef.current) return;

			const sections = mainContentRef.current.querySelectorAll("section");
			let maxVisibleArea = 0;
			let mostVisible = null;
			let lastPassed = null;

			const headerHeight = document.querySelector("header")?.offsetHeight || 0;

			sections.forEach((section) => {
				const rect = section.getBoundingClientRect();

				if (rect.top <= headerHeight) {
					lastPassed = section.id.replace("category-", "");
				}

				const visibleTop = Math.max(rect.top, headerHeight);
				const visibleBottom = Math.min(rect.bottom, window.innerHeight);

				if (visibleBottom > visibleTop) {
					const visibleArea = visibleBottom - visibleTop;
					if (visibleArea > maxVisibleArea) {
						maxVisibleArea = visibleArea;
						mostVisible = section.id.replace("category-", "");
					}
				}
			});

			const next = mostVisible ?? lastPassed;
			if (next) setSelectedCategory(next);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, [activeMenu?.id]);

	return {
		activeMenu,
		categories,
		activeCategory,
		setActiveCategory: setSelectedCategory,
		mainContentRef,
	};
}
