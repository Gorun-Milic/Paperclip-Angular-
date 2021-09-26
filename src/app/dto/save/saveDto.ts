import { ProductWithPhoto } from "../product/productWithPhoto";
import { User } from "../user/user";

export class SaveDto {
    
    id: string;
    product: ProductWithPhoto;
    user: User;

    constructor() {
    }
}