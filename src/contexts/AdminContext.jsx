import { AdminContext } from "./adminContext.js";

export function AdminProvider({ children, value }) {
	return (
		<AdminContext.Provider value={value}>{children}</AdminContext.Provider>
	);
}
