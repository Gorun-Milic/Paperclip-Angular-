export class SearchUserParams {
    constructor(
        public name: string,
        public countryName: string,
        public currentPage: number,
        public pageSize: number
    ){}
}