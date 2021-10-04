import { User } from "../user/user";
import { Chat } from "../chat/chat";

export class Message {

    id: string;
    text: string;
    // date: Date;
    time: Date;
    chat: Chat;
    user: User;
    seen: number;

    constructor() {}
}