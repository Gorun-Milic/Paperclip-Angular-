import { Category } from "../category/category";

export class Product {
    constructor(
        public name: string, 
        public price: number, 
        public description: string, 
        public category: Category, 
    ){}
}