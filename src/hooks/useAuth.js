import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient.js";

export default function useAuth() {
	const [session, setSession] = useState(null);
	const [authReady, setAuthReady] = useState(() => (supabase ? false : true));

	useEffect(() => {
		if (!supabase) return undefined;

		let mounted = true;

		supabase.auth.getSession().then(({ data }) => {
			if (!mounted) return;
			setSession(data.session ?? null);
			setAuthReady(true);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, nextSession) => {
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

	return { session, authReady, signOut };
}
