// Definición de la interfaz Employee basada en la estructura proporcionada en la imagen.
export interface IClient {
  id: string;
  first_name: string;
  second_name: string;
  first_last_name: string;
  second_last_name: string;
  email: string;
  phone_number: string;
  address: string;

}

// Arreglo de empleados con datos de ejemplo basado en la estructura proporcionada en la imagen.
export const clients: IClient[] = [
  {
    id: 'emp004',
    first_name: 'Ana',
    second_name: 'María',
    first_last_name: 'Vega',
    second_last_name: 'Solís',
    email: 'ana.vega@empresa.com',
    phone_number: '555-4000',
    address: 'Calle Nueva 456, Ciudad',
  },
  {
    id: 'emp005',
    first_name: 'Luis',
    second_name: 'Alberto',
    first_last_name: 'Carranza',
    second_last_name: 'Montes',
    email: 'luis.carranza@empresa.com',
    phone_number: '555-5000',
    address: 'Plaza Central 32, Ciudad',
  },
  {
    id: 'emp006',
    first_name: 'Rosa',
    second_name: 'Elvira',
    first_last_name: 'López',
    second_last_name: 'Quintana',
    email: 'rosa.lopez@empresa.com',
    phone_number: '555-6000',
    address: 'Avenida del Parque 789, Ciudad',
  },
  // ... puedes agregar más empleados según sea necesario
];

