"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { fetchLogin } from "../(login)/api/useLogin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/userStore";
import { Button, Card, CardBody, Chip, Image, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";
import Logo from '@/public/images/jefa2.png';

const Login: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isVisible, setIsVisible] = React.useState(false);
	const { setUser, user } = useUserStore();
	const router = useRouter();

	const toggleVisibility = () => setIsVisible(!isVisible);

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<ToastContainer position="top-center" />
			<div className="flex flex-col items-center justify-center h-screen gap-4" style={{ backgroundImage: `url('/images/fondoLoginAct.jpg')` }}>

				<Card className="border-none bg-background/80 dark:bg-default-100/50 max-w-64">
							<Image
								removeWrapper
								alt="Card background"
								className="z-0  object-cover w-full h-full "
								src={Logo.src}
							/>
				</Card>

				<Card
					className="border-none bg-background/80 dark:bg-default-100/50 max-w-64 py-5"
					shadow="sm"
				>
					<CardBody>
								<form
									className="flex flex-col space-y-4"
									onSubmit={handleSubmit}
								>
									<div>
										<Input
											isClearable
											className="text-black"
											onClear={() => setUsername("")}
											type="text"
											variant="faded"
											label="Username"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
										/>
									</div>
									<div>
										<Input
											variant="faded"
											endContent={
												<button
													className="focus:outline-none"
													type="button"
													onClick={toggleVisibility}
												>
													{isVisible ? (
														<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
													) : (
														<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
													)}
												</button>
											}
											type={isVisible ? "text" : "password"}
											label="Password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
									<Button type="submit" color="warning" variant="shadow" >
										Iniciar sesión
									</Button>
								</form>
					</CardBody>
				</Card>
			</div>
		</>
	);
};

export default Login;
