import React, { useState, FormEvent, useEffect } from "react";
import { fetchLogin } from "../(login)/api/useLogin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/userStore";

const Login: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { setUser, user } = useUserStore();
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const user = await fetchLogin(username, password);
			const role = user?.role.toLowerCase();

			if (user) {
				setUser(user);
				toast.success(`Bienvenido de vuelta ${user.firstName}!`, {
					autoClose: 1800,
				});
				setTimeout(() => {
					router.push(`/${role}`);
				}, 1800);
			} else {
				toast.error("Usuario o contraseña incorrectos", {
					autoClose: 1800,
				});
			}
		} catch (error) {
			toast.error("Ocurrió un error al iniciar sesión");
			console.error(error);
		}
	};

	useEffect(() => {
		if (user) {
			const role = user.role.toLowerCase();
			router.push(`/${role}`);
		}
	}, []);

	return (
		<>
			<ToastContainer position="top-center" />

			<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
				<div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
					<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="username" className="sr-only">
								Username
							</label>
							<input
								type="text"
								name="username"
								id="username"
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
								placeholder="Enter your user"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
