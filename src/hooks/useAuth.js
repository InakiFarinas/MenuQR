import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient.js";
import { slugify } from "../utils/menu.js";

export default function useAuth() {
	const [session, setSession] = useState(null);
	const [authReady, setAuthReady] = useState(() => (supabase ? false : true));

	useEffect(() => {
		if (!supabase) return undefined;

		let mounted = true;

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, nextSession) => {
			if (!mounted) return;
			setSession(nextSession ?? null);
			setAuthReady(true);
		});

		return () => {
			mounted = false;
			subscription.unsubscribe();
		};
	}, []);

	async function signOut() {
		if (!supabase) return;
		await supabase.auth.signOut();
	}

	async function login(email, password) {
		if (!supabase) {
			return { data: null, error: new Error("Supabase no está configurado.") };
		}

		return supabase.auth.signInWithPassword({ email, password });
	}

	async function registerRestaurant({
		email,
		password,
		restaurantName,
		restaurantSlug,
	}) {
		if (!supabase) {
			return { error: new Error("Supabase no está configurado.") };
		}

		const { error: signUpError } = await supabase.auth.signUp({
			email,
			password,
		});
		if (signUpError) {
			return { error: signUpError };
		}

		const { data: signInData, error: signInError } =
			await supabase.auth.signInWithPassword({
				email,
				password,
			});

		if (signInError) {
			return { error: null, requiresConfirmation: true };
		}

		const userId = signInData.session?.user?.id;
		if (!userId) {
			return {
				error: new Error("No se pudo obtener el usuario después del registro."),
			};
		}

		const slug = restaurantSlug || slugify(restaurantName || email);
		const { data: restaurant, error: insertError } = await supabase
			.from("restaurants")
			.insert([
				{
					nombre: restaurantName || "Mi restaurante",
					slug,
					owner_id: userId,
				},
			])
			.select()
			.single();

		if (insertError) {
			return {
				error: insertError,
			};
		}

		return { data: restaurant, error: null };
	}

	return { session, authReady, signOut, login, registerRestaurant };
}
