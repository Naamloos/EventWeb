import { Role } from "./Role";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    roles: Role[];
    is_super_admin: boolean;
}
