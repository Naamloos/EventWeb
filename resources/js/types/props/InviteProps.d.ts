import { User } from "../User"

export interface InviteProps {
    auth: {
        user: User;
    },
    newInvite?: string;
}
