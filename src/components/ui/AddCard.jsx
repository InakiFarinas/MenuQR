export default function AddCard({
	title = "Agregar",
	subtitle = "",
	onClick,
	RightIcon: Icon = null,
	className = "",
}) {
	return (
		<div className={`mt-4 ${className}`}>
			<div
				onClick={onClick}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") onClick && onClick();
				}}
				className="w-full flex cursor-pointer items-center gap-3 rounded-[1.25rem] border border-dotted border-emerald-400 bg-emerald-50/60 p-4 text-emerald-800 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(16,185,129,0.06)]"
			>
				<div className="flex-1">
					<h3 className="text-lg text-emerald-900 font-medium">{title}</h3>
					{subtitle && (
						<p className="text-sm text-emerald-700/80">{subtitle}</p>
					)}
				</div>

				<div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-100 text-emerald-700">
					{Icon && <Icon size={16} stroke={1.8} />}
				</div>
			</div>
		</div>
	);
}
