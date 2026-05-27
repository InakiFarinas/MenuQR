import { warn } from "./logger.js";

const EVENT_NAME = "menuqr-alert";

const bus =
	typeof window !== "undefined" && window?.document ? new EventTarget() : null;

export function onAlert(handler) {
	if (!bus) return () => {};
	const listener = (e) => handler(e.detail);
	bus.addEventListener(EVENT_NAME, listener);
	return () => bus.removeEventListener(EVENT_NAME, listener);
}

export function triggerAlert({ type = "info", message = "" } = {}) {
	if (!bus) {
		// fallback to logger
		warn("Alert triggered but no bus available:", type, message);
		return;
	}

	const ev = new CustomEvent(EVENT_NAME, { detail: { type, message } });
	bus.dispatchEvent(ev);
}

export default { onAlert, triggerAlert };
