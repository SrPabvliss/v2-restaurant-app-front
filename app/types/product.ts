export interface IProductCategory {
    id:          number;
    name:        string;
    description: null;
    Products:    Product[];
}

export interface Product {
    id:           number;
    name:         string;
    price:        string;
    availability: boolean;
}
