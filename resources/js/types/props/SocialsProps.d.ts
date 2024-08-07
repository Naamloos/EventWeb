import { Social } from "../Social";
import { User } from "../User"

export interface SocialsProps {
    auth: {
        user: User;
    },
    socials?: Social[];
}
