import { useParams } from "react-router-dom";
import { useAdmin } from "../contexts/AdminContext.jsx";

export default function useSelectedRestaurant() {
	const { slug } = useParams();
	const { restaurants } = useAdmin();
	const selected = restaurants.find((r) => r.slug === slug) ?? restaurants[0];
	return { selected, slug, restaurants };
}
