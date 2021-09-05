import { Category } from "../category/category";

export class SearchProduct {
    constructor(
        public name: string,
        public category: Category,
        public isProduct: boolean,
        public currentPage: number,
        public pageSize: number
    ){}
}