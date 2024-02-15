import { Role } from "../Enums/UserEnums";

export type AuthType = {
    isAuthenticated: boolean,
    lastAuthenticatedUnix: number,
    hasAuthenticated: boolean
};

export type UserType = {
    email: string,
    password: string,
    author_name: string,
    last_login_unix?: number;
    role?: Role;
}

export type LoginType = {
    email?: string,
    username?: string,
    password: string,
}