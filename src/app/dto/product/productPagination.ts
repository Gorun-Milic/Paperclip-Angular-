import { ProductWithPhoto } from "./productWithPhoto";

export class ProductPagination {
    constructor(public products: ProductWithPhoto[],
                public total: number) {}
}