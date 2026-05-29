import { useOutletContext } from "react-router-dom";
import AdminMenusList from "../../components/admin/AdminMenusList.jsx";

export default function MenusWrapper() {
	const { selectedRestaurant, admin, handleSelectMenu, handleDeleteMenu } =
		useOutletContext();

	return (
		<AdminMenusList
			restaurant={selectedRestaurant}
			onSelectMenu={handleSelectMenu}
			onAddMenu={(data) => admin.addMenu(selectedRestaurant.id, () => {}, data)}
			updateMenuField={admin.updateMenuField}
			removeMenu={handleDeleteMenu}
		/>
	);
}
