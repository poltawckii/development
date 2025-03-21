import {IUserState} from "./IUser";
import {IAbout} from "@/types/IAbout";
export interface IState {
    id: {id: number},
    token: IUserState,
    favourites: IFavourites | undefined,
    history: IHistory | undefined,
    swap: string
}

export interface IFavourite{
     url: string | undefined; id: number | undefined; rate: number | undefined
}
export interface IHistory{
    history: IFavourite[];
}
export interface IFavourites{
    list: IFavourite[]
}


export interface ICarousel {
    carousel1: ICarouse | undefined;
    carousel2: ICarouse | undefined;
}
export interface ICarouse{
    items: IAbout[],
    total: number,
    totalPages: number
}