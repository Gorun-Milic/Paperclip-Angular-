import { Product } from "../product/product";
import { ProductWithPhoto } from "../product/productWithPhoto";
import { User } from "../user/user";

export class Offer {

    id: string;
    seen: number;
    time: Date;
    sender: User;
    receiver: User;
    offeredProduct: ProductWithPhoto;
    receivedProduct: ProductWithPhoto;

    constructor() {}
}