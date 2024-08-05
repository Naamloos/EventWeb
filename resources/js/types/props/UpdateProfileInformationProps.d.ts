import { User } from "../User"

export interface UpdateProfileInformationProps {
    auth:{
        user: User;
    },
    mustVerifyEmail: boolean,
    status?: string,
    className?: string
}
