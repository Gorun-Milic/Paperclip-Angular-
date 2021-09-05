import { Product } from "../product/product";
import { User } from "../user/user";

export class Comment {
    constructor(
        
        public text: string, 
        public date: Date, 
        public user: User,
        public product: Product,
    ){}
}