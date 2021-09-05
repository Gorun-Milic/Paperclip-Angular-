import { Category } from "../category/category";
import { Photo } from "../photo";
import { User } from "../user/user";

export class ProductWithPhoto {
    constructor(
        public id: string,
        public name: string, 
        public description: string, 
        public category: Category,
        public user: User,
        public photo: string
    ){}
}