import { User } from "./user";

export class UserPagination {
    constructor(public users: User[],
                public total: number) {}
}