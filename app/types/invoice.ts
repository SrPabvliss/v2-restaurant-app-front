export interface IInvoice {
  id: number;
  total: number;
  state: string;
  paymentMethod: string;
  employee: Employee;
  visit: Visit;
  customer: Customer;
}
export interface Employee {
  id: string;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  user: string;
  password: string;
  role: string;
}
export interface Visit {
  id: number;
  entry: string;
  exit: string;
  masterOrders?: MasterOrdersEntity[] | null;
}
export interface MasterOrdersEntity {
  id: number;
  createdAt: string;
  orders?: OrdersEntity[] | null;
}
export interface OrdersEntity {
  id: number;
  quantity: number;
  queuedAt: string;
  product: Product;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  availability: boolean;
}
export interface Customer {
  id: string;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}
