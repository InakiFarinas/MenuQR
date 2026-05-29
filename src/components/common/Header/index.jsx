import { useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader.jsx";
import PublicHeader from "./PublicHeader.jsx";

export default function Header(props) {
	const location = useLocation();
	return location.pathname.startsWith("/admin") ? (
		<AdminHeader {...props} />
	) : (
		<PublicHeader {...props} />
	);
}

export { AdminHeader, PublicHeader };
