
export class SearchUser {
    
    constructor(
        public name: string,
        public country: string,
        public city: string,
        public currentPage: number,
        public pageSize: number
    ) {}

}