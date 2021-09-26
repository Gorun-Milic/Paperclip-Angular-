import { Product } from "../product/product";
import { User } from "../user/user";

export class Notification {

    id: string;
    type: string;
    seen: number;
    date: Date;
    product: Product;
    user: User;

    constructor() {}
}