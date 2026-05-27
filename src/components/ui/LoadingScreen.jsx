import StatusScreen from "./StatusScreen.jsx";

function SpinnerIcon({ size = 28 }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden
			className="animate-spin"
		>
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeOpacity="0.15"
				strokeWidth="4"
			/>
			<path
				d="M22 12a10 10 0 00-10-10"
				stroke="currentColor"
				strokeWidth="4"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export default function LoadingScreen() {
	return (
		<StatusScreen
			icon={SpinnerIcon}
			iconLabel="Cargando"
			title="Cargando restaurantes..."
			description="Un momento, estamos preparando tu experiencia."
			maxWidth="max-w-sm"
		/>
	);
}
