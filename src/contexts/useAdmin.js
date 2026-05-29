import { useContext } from "react";
import { AdminContext } from "./adminContext.js";

export function useAdmin() {
	const ctx = useContext(AdminContext);
	if (!ctx) {
		throw new Error("useAdmin must be used within an AdminProvider");
	}
	return ctx;
}
