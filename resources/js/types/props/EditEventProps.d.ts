import { Event } from "../Event";
import { User } from "../User";

export interface EditEventProps {
    auth: {
        user: User;
    },
    event: Event;
}
