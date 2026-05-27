import { IconPhoto } from "@tabler/icons-react";

const DishCard = ({ dish, isActive = true, compact = false }) => {
	if (!dish) return null;

	const { name, description, price, image } = dish;

	const inactiveClass = isActive ? "" : "opacity-60 grayscale";

	if (compact) {
		return (
			<div className={`flex items-center gap-4 ${inactiveClass}`}>
				<div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-black/3">
					{image ? (
						<img
							src={image}
							alt={name}
							className="h-full w-full object-cover"
						/>
					) : (
						<div className="flex h-full items-center justify-center text-gray-400">
							<IconPhoto size={24} stroke={1.6} />
						</div>
					)}
				</div>

				<div className="min-w-0 flex-1">
					<h4 className="text-[1.05rem] font-semibold leading-tight text-gray-950 truncate">
						{name}
					</h4>
					{description ? (
						<p className="text-sm text-gray-600 truncate">{description}</p>
					) : null}
					{price != null && (
						<p className="mt-2 text-sm font-semibold text-gray-950">${price}</p>
					)}
				</div>

				{/* badge rendered in admin list actions */}
			</div>
		);
	}

	return (
		<article
			className={`relative flex overflow-hidden rounded-3xl border border-black/5 bg-white/85 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] ${inactiveClass}`}
		>
			<div className="min-w-0 flex-1 p-4 sm:p-5">
				<div className="flex h-full flex-col justify-between gap-4">
					<div className="space-y-1">
						<h3 className="text-xl leading-tight text-gray-950 sm:text-[1.35rem]">
							{name}
						</h3>
						{description ? (
							<p className="text-sm leading-6 text-gray-600">{description}</p>
						) : null}
					</div>

					{price != null ? (
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
								Precio
							</p>
							<p className="text-lg font-semibold text-gray-950">${price}</p>
						</div>
					) : (
						<span />
					)}
				</div>
			</div>

			<div className="relative w-32 shrink-0 bg-black/3 sm:w-44 lg:w-48">
				{image ? (
					<img
						className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
						src={image}
						alt={name}
					/>
				) : (
					<div className="flex h-full items-center justify-center text-gray-400">
						<IconPhoto size={28} stroke={1.6} />
					</div>
				)}
			</div>
		</article>
	);
};

export default DishCard;
