import { useParams } from "react-router-dom";
import { useAdmin } from "../contexts/useAdmin.js";

export default function useSelectedRestaurant() {
	const { slug } = useParams();
	const { restaurants } = useAdmin();
	const selected = restaurants.find((r) => r.slug === slug) ?? null;
	return { selected, slug, restaurants };
}
