import { Event } from "../Event";
import { User } from "../User";

export interface EventIndexProps {
    auth: {
        user: User;
    },
    events: Event[];
}
