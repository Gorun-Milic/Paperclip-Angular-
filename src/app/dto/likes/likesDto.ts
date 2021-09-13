import { User } from "../user/user";

export class LikesDto {
    constructor(        
        public users: User[],
        public total: number
    ){}
}