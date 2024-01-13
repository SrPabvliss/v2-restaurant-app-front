export interface IProductCategory {
    id:          number;
    name:        string;
    description: null;
    products:    Product[];
}

export interface Product {
    id:           number;
    name:         string;
    price:        number;
    availability: boolean;
}
