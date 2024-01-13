import { IUser } from "../types/user";

export const fetchLogin = async (username: string, password: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: username,
					password: password,
				}),
			}
		);

		if (!response.ok) {
			console.log("Error en la autenticación.");
			return;
		}
		const data = await response.json();
		const userData: IUser = data;

		if (!userData) {
			console.log("Error en la autenticación");
			return;
		}
		
		return userData;
	} catch (error) {
		console.log(error);
	}
};
