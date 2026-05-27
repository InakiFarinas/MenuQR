import { Switch } from "@headlessui/react";

export default function AdminToggle({
	checked,
	onChange,
	onClick,
	className = "",
	...props
}) {
	return (
		<Switch
			checked={checked}
			onChange={onChange}
			onClick={onClick}
			className={`group inline-flex h-6 w-11 items-center rounded-full bg-black/10 transition data-checked:bg-emerald-500 ${className}`}
			{...props}
		>
			<span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
		</Switch>
	);
}
