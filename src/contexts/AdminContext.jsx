import { createContext, useContext } from "react";

const AdminContext = createContext(null);

export function AdminProvider({ children, value }) {
	return (
		<AdminContext.Provider value={value}>{children}</AdminContext.Provider>
	);
}

export function useAdmin() {
	const ctx = useContext(AdminContext);
	if (!ctx) {
		throw new Error("useAdmin must be used within an AdminProvider");
	}
	return ctx;
}
