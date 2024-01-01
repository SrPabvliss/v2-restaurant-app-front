import { IMasterOrder } from "./order";

export interface IVisit {
    id: number;
    entry: Date;
    exit: Date;
    table: ITable;
    masterOrders?: IMasterOrder[];
}