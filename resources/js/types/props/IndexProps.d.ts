import { User } from "../User"

export interface IndexProps {
    auth: {
        user: User;
    },
    laravelVersion: string,
    phpVersion: string,
    instagramPhotos?: instaphoto[],
}

interface instaphoto {
    url: string;
    image: string;
}
