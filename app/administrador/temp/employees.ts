// Definición de la interfaz Employee basada en la estructura proporcionada.
export interface IEmployee {
	id: string;
	first_name: string;
	second_name: string;
	first_last_name: string;
	second_last_name: string;
	email: string;
	phone_number: string;
	address: string;
	user: string;
	password: string;
	role: string;
}

export const employees: IEmployee[] = [
	{
		id: "emp001",
		first_name: "Juan",
		second_name: "Carlos",
		first_last_name: "Pérez",
		second_last_name: "López",
		email: "juan.perez@empresa.com",
		phone_number: "555-1000",
		address: "Calle Falsa 123, Ciudad",
		user: "juanp",
		password: "pass123",
		role: "CAJERO",
	},
	{
		id: "emp002",
		first_name: "Laura",
		second_name: "Patricia",
		first_last_name: "Gómez",
		second_last_name: "Fernández",
		email: "laura.gomez@empresa.com",
		phone_number: "555-2000",
		address: "Avenida Siempreviva 456, Ciudad",
		user: "laurag",
		password: "pass234",
		role: "CHEF",
	},
	{
		id: "emp003",
		first_name: "Carlos",
		second_name: "Andrés",
		first_last_name: "Martínez",
		second_last_name: "Rodríguez",
		email: "carlos.martinez@empresa.com",
		phone_number: "555-3000",
		address: "Boulevard Las Lilas 789, Ciudad",
		user: "carlosm",
		password: "pass345",
		role: "MESERO",
	},
];

