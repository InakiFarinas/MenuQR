export default function ActionButton({
	type = "delete",
	icon: Icon,
	onClick,
	ariaLabel,
}) {
	const styles =
		type === "edit"
			? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
			: "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100";

	const computedAria = ariaLabel || (type === "edit" ? "Editar" : "Eliminar");

	return (
		<button
			onClick={onClick}
			className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl transition ${styles}`}
			aria-label={computedAria}
			title={computedAria}
		>
			{Icon ? <Icon size={16} stroke={1.8} /> : null}
		</button>
	);
}
