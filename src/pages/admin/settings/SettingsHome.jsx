export default function SettingsHome({ items, onSelectPage }) {
	return (
		<div className="space-y-3">
			{items.map((item) => {
				const ItemIcon = item.icon ?? (() => null);

				return (
					<button
						key={item.id}
						type="button"
						onClick={() => onSelectPage(item.id)}
						className="flex w-full items-center justify-between rounded-2xl border border-black/5 bg-white px-4 py-4 text-left shadow-sm transition hover:border-black/10 hover:bg-black/2 sm:px-5"
					>
						<span className="flex min-w-0 items-center gap-3">
							<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black/5 text-gray-900">
								<ItemIcon size={18} stroke={1.8} />
							</span>
							<span className="min-w-0">
								<span className="block text-sm font-semibold text-gray-950 sm:text-base">
									{item.title}
								</span>
								<span className="mt-0.5 block text-sm text-gray-500">
									{item.description}
								</span>
							</span>
						</span>
						<span className="text-gray-400">›</span>
					</button>
				);
			})}
		</div>
	);
}
