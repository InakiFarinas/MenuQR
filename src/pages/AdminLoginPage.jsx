import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IconLock, IconLogin } from "@tabler/icons-react";
import supabase from "../lib/supabaseClient.js";
import useSelectedRestaurant from "../hooks/useSelectedRestaurant.js";
import useAuth from "../hooks/useAuth.js";

export default function AdminLoginPage() {
	const navigate = useNavigate();
	const { selected: selectedRestaurant } = useSelectedRestaurant();
	const { session, signOut } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// registration fields
	const [mode, setMode] = useState("login"); // 'login' or 'register'
	const [restaurantName, setRestaurantName] = useState(
		selectedRestaurant?.name || "",
	);
	const [restaurantSlug, setRestaurantSlug] = useState(
		selectedRestaurant?.slug || "",
	);

	if (session?.user?.id === selectedRestaurant.ownerId) {
		return <Navigate to={`/admin/${selectedRestaurant.slug}`} replace />;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setErrorMessage("");

		if (!supabase) {
			setErrorMessage("Supabase no está configurado.");
			return;
		}
		setIsSubmitting(true);
		try {
			if (mode === "login") {
				const { data, error } = await supabase.auth.signInWithPassword({
					email,
					password,
				});
				if (error) {
					setErrorMessage(error.message);
					return;
				}

				if (data.session?.user?.id !== selectedRestaurant.ownerId) {
					await supabase.auth.signOut();
					setErrorMessage("Este usuario no tiene acceso a este restaurante.");
					return;
				}

				navigate(`/admin/${selectedRestaurant.slug}`, { replace: true });
			} else {
				const { error: signUpError } = await supabase.auth.signUp({
					email,
					password,
				});
				if (signUpError) {
					setErrorMessage(signUpError.message);
					return;
				}

				// try sign in to obtain user id (may require email confirm)
				const { data: signInData, error: signInError } =
					await supabase.auth.signInWithPassword({ email, password });
				if (signInError) {
					setErrorMessage(
						"Registro creado. Confirma tu correo y luego inicia sesión.",
					);
					return;
				}

				const userId = signInData.session?.user?.id;
				if (!userId) {
					setErrorMessage(
						"No se pudo obtener el usuario después del registro.",
					);
					return;
				}

				const slug = restaurantSlug || slugify(restaurantName || email);
				const { data: insertData, error: insertError } = await supabase
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
					setErrorMessage(
						insertError.message || "No se pudo crear el restaurante.",
					);
					return;
				}

				navigate(`/admin/${insertData.slug}`, { replace: true });
			}
		} catch (err) {
			setErrorMessage(err?.message || "No se pudo completar la acción.");
		} finally {
			setIsSubmitting(false);
		}
	}

	function slugify(text) {
		return (
			String(text)
				.toLowerCase()
				.trim()
				.replace(/\s+/g, "-")
				.replace(/[^a-z0-9-]/g, "")
				.replace(/-+/g, "-") || Math.random().toString(36).slice(2, 8)
		);
	}

	return (
		<div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
				<div className="grid w-full overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[1.1fr_0.9fr]">
					<div className="relative hidden overflow-hidden bg-gray-950 p-8 text-white lg:block">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent_28%)]" />
						<div className="relative z-10 flex h-full flex-col justify-between">
							<div>
								<p className="text-sm uppercase tracking-[0.24em] text-white/60">
									Acceso del restaurante
								</p>
								<h1 className="mt-4 max-w-md text-4xl font-semibold leading-tight">
									{selectedRestaurant.name}
								</h1>
								<p className="mt-4 max-w-md text-sm leading-6 text-white/70">
									Inicia sesión con la cuenta del dueño para administrar la
									carta, categorías, platos y ajustes del restaurante.
								</p>
							</div>
							<div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur">
								<p className="text-xs uppercase tracking-[0.2em] text-white/50">
									Slug
								</p>
								<p className="mt-2 text-lg font-medium">
									{selectedRestaurant.slug}
								</p>
							</div>
						</div>
					</div>

					<div className="p-6 sm:p-8 lg:p-10">
						<div className="flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-white">
								<IconLock size={20} stroke={1.8} />
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">Restaurante</p>
								<h2 className="text-2xl font-semibold text-gray-950">
									Acceso administrativo
								</h2>
							</div>
						</div>

						<div className="mt-4 flex flex-col sm:flex-row gap-2">
							<button
								type="button"
								onClick={() => setMode("login")}
								className={`w-full sm:w-auto rounded-full px-3 py-1 text-sm font-medium ${mode === "login" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"}`}
							>
								Iniciar sesión
							</button>
							<button
								type="button"
								onClick={() => setMode("register")}
								className={`w-full sm:w-auto rounded-full px-3 py-1 text-sm font-medium ${mode === "register" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"}`}
							>
								Registrarse
							</button>
						</div>

						{session?.user?.id &&
						session.user.id !== selectedRestaurant.ownerId ? (
							<div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
								Ya existe una sesión iniciada con otra cuenta. Cierra sesión y
								entra con el usuario del restaurante.
							</div>
						) : null}

						<div className="mt-8">
							<h3 className="text-xl font-semibold text-gray-950">
								{selectedRestaurant.name}
							</h3>
							<p className="mt-1 text-sm text-gray-500">
								Usa el correo y la contraseña del propietario del restaurante.
							</p>
						</div>

						<form onSubmit={handleSubmit} className="mt-6 space-y-4">
							<label className="block">
								<span className="mb-2 block text-sm font-medium text-gray-700">
									Correo electrónico
								</span>
								<input
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950"
									placeholder="dueño@restaurante.com"
								/>
							</label>

							{mode === "register" ? (
								<>
									<label className="block">
										<span className="mb-2 block text-sm font-medium text-gray-700">
											Nombre del restaurante
										</span>
										<input
											type="text"
											value={restaurantName}
											onChange={(e) => setRestaurantName(e.target.value)}
											className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950"
											placeholder="Ej: Mi Tenedor"
										/>
									</label>

									<label className="block">
										<span className="mb-2 block text-sm font-medium text-gray-700">
											Slug (opcional)
										</span>
										<input
											type="text"
											value={restaurantSlug}
											onChange={(e) => setRestaurantSlug(e.target.value)}
											className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950"
											placeholder="mi-restaurante"
										/>
									</label>
								</>
							) : null}

							<label className="block">
								<span className="mb-2 block text-sm font-medium text-gray-700">
									Contraseña
								</span>
								<input
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950"
									placeholder="••••••••"
								/>
							</label>

							{errorMessage ? (
								<div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
									{errorMessage}
								</div>
							) : null}

							<button
								type="submit"
								disabled={isSubmitting}
								className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
							>
								<IconLogin size={16} stroke={1.8} />
								{isSubmitting
									? mode === "login"
										? "Ingresando..."
										: "Registrando..."
									: mode === "login"
										? "Entrar al panel"
										: "Crear cuenta y restaurante"}
							</button>
						</form>

						{signOut ? (
							<button
								type="button"
								onClick={signOut}
								className="mt-4 text-sm font-medium text-gray-500 transition hover:text-gray-950"
							>
								Cerrar sesión actual
							</button>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
