import { useEffect, useState } from "react";
import { onAlert } from "../../lib/alertBus.js";

function AlertItem({ id, type, message, onClose }) {
	const bg =
		type === "error"
			? "bg-red-50 border-red-200 text-red-800"
			: "bg-gray-50 border-black/5 text-gray-900";

	useEffect(() => {
		const t = setTimeout(() => onClose(id), 6000);
		return () => clearTimeout(t);
	}, [id, onClose]);

	return (
		<div className={`mb-2 max-w-sm rounded-lg border p-3 shadow-sm ${bg}`}>
			<div className="text-sm font-medium">{message}</div>
		</div>
	);
}

export default function Alert() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const unsub = onAlert(({ type, message }) => {
			const id =
				Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
			setItems((s) => [{ id, type, message }, ...s]);
		});

		return () => unsub();
	}, []);

	const handleClose = (id) => setItems((s) => s.filter((it) => it.id !== id));

	if (items.length === 0) return null;

	return (
		<div className="pointer-events-none fixed top-4 right-4 z-50 flex flex-col items-end">
			{items.map((it) => (
				<div key={it.id} className="pointer-events-auto">
					<AlertItem {...it} onClose={handleClose} />
				</div>
			))}
		</div>
	);
}
