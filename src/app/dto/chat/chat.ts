import { Product } from "../product/product";
import { User } from "../user/user";

export class Chat {

    id: string;
    user1NotSeen: number;
    user2NotSeen: number;
    date: Date;
    user1: User;
    user2: User;

    constructor() {}
}