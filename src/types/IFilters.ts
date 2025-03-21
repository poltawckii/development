export interface IFilters{
    docs: IFilter[];
}
export interface IFilter {
    name: string,
    alternativeName: string,
    url: string,
    type: string,
    rating: {imdb: number},
    poster: {url: string},
}