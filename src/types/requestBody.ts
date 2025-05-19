export interface RequestLogin {
    username: string;
    password: string;
    expiresInMins?: number;
}