import { triggerAlert } from "./alertBus.js";

export function error(...args) {
	// Send a user-facing alert (use first arg as message if possible)
	try {
		const message = typeof args[0] === "string" ? args[0] : String(args[0]);
		triggerAlert({ type: "error", message });
	} catch {
		// ignore alert failures
	}

	// Always log to console for developers
	// eslint-disable-next-line no-console
	console.error(...args);
}
export function warn(...args) {
	try {
		const message = typeof args[0] === "string" ? args[0] : String(args[0]);
		triggerAlert({ type: "warning", message });
	} catch {
		// ignore alert failures
	}

	// eslint-disable-next-line no-console
	console.warn(...args);
}

export function info(...args) {
	try {
		const message = typeof args[0] === "string" ? args[0] : String(args[0]);
		triggerAlert({ type: "info", message });
	} catch {
		// ignore alert failures
	}

	// eslint-disable-next-line no-console
	console.info(...args);
}

export default { error, warn, info };
