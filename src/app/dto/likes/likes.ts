import { Product } from "../product/product";
import { User } from "../user/user";

export class Likes {
    
    id: string;
    product: Product;
    user: User;

    constructor() {
    }
}