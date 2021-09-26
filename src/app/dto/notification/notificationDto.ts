import { Notification } from "./notification";

export class NotificationDto {
    constructor(
        public notifications: Notification[],
        public total: number
    ) {

    }
}