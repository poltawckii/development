export interface IUserState{
    token?: string | undefined;
    user?: {
        avatar: string | undefined;
        eMail: string | undefined;
        id: string | undefined;
        __v?: string | undefined;
    };
    isAuth: boolean;
}
export interface IUser{
    token?: string | undefined;
    user?: {
        avatar: string | undefined;
        eMail: string | undefined;
        id: string | undefined;
        __v?: string | undefined;
    };
}