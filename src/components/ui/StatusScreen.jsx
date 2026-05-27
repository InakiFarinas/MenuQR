export default function StatusScreen({
	badge,
	title,
	description,
	icon: Icon,
	iconLabel,
	maxWidth = "max-w-md",
}) {
	return (
		<div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-100 px-4 py-8 text-center sm:px-6">
			<div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.08),transparent_68%)] sm:h-56" />
			<div
				className={`relative w-full ${maxWidth} rounded-[1.75rem] border border-black/5 bg-white/85 px-5 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:px-8 sm:py-10`}
			>
				<div className="space-y-3 sm:space-y-4">
					<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-950 text-white shadow-lg sm:h-20 sm:w-20">
						{Icon ? (
							<Icon size={28} stroke={1.8} aria-label={iconLabel} />
						) : (
							badge
						)}
					</div>
					<div className="space-y-2">
						<p className="text-base font-semibold tracking-tight text-gray-950 sm:text-lg">
							{title}
						</p>
						<p className="mx-auto max-w-sm text-sm leading-6 text-gray-500 sm:text-[0.95rem]">
							{description}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
