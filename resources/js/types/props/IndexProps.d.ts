import { User } from "../User"

export interface IndexProps {
    auth: {
        user: User;
    },
    laravelVersion: string,
    phpVersion: string
}
