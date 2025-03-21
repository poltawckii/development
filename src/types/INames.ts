export interface INames{
    docs: IName[];
}
export interface IName {
    name: string,
    alternativeName: string,
    url: string,
    type: string,
    rating: {imdb: number},
    poster: {url: string},
}