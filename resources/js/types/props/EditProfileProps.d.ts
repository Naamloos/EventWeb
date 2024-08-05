import { User } from "../User"

export interface EditProfileProps
{
    auth:{
        user: User;
    },
    mustVerifyEmail: boolean,
    status?: string
}

