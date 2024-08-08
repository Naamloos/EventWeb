import Note from "../Note";
import { User } from "../User"

export interface DashboardProps {
    auth: {
        user: User;
    },
    notes: Note[];
}
