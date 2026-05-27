import { Outlet } from "react-router-dom";

export default function SettingsPage() {
	return (
		<div className="space-y-8">
			<div className="overflow-hidden rounded-3xl border border-black/5 bg-white/85 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
				<div className="p-3 sm:p-4">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
