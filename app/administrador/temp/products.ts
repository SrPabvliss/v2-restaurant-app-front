// Definición de la interfaz Product basada en la estructura proporcionada en la imagen.
export interface IProduct {
  id: number;
  name: string;
  price: number;
  availability: boolean;
  category_id: number;
}

// Arreglo de productos con datos de ejemplo basado en la estructura proporcionada en la imagen.
export const products: IProduct[] = [
  {
    id: 101,
    name: 'Café Americano',
    price: 2.99,
    availability: true,
    category_id: 1,
  },
  {
    id: 102,
    name: 'Croissant de Almendras',
    price: 4.50,
    availability: true,
    category_id: 2,
  },
  {
    id: 103,
    name: 'Jugo de Naranja Natural',
    price: 3.25,
    availability: true,
    category_id: 3,
  },
  {
    id: 104,
    name: 'Sandwich de Pavo',
    price: 5.00,
    availability: false, // Supongamos que este producto no está disponible
    category_id: 4,
  },
  {
    id: 105,
    name: 'Té Chai Latte',
    price: 3.75,
    availability: true,
    category_id: 5,
  },
  // ... puedes agregar más productos según sea necesario
];
