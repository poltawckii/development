export interface IAbout{
    slogan?: string;
    description?: string;
    genres?: {genre: string}[];
    year?: number;
    ratingAgeLimits?: string;
    filmLength?: number;
    countries?: {country: string}[];
    nameRu?: string;
    posterUrl?: string;
    posterUrlPreview?: string;
    ratingKinopoisk?: number;
    ratingKinopoiskVoteCount?: number;
    kinopoiskId?: number;
    filmId?: number;
    nameOriginal: string;
    nameEn: string,
    ratingImdbVoteCount: number,
    ratingImdb: number
}