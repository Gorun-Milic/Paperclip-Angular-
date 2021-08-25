import { Category } from "../category/category";
import { User } from "../user/user";

export class Product {
    constructor(
        public name: string, 
        public description: string, 
        public category: Category,
        public user: User
    ){}
}