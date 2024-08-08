import { Social } from "../Social";
import { User } from "../User"

export interface IndexProps {
    auth: {
        user: User;
    },
    laravelVersion: string,
    phpVersion: string,
    instagramPhotos?: instaphoto[],
    socials: Social[]
}

interface instaphoto {
    url: string;
    image: string;
}
