
export interface ISimilars {
    items: ISimilar[];
}
export interface ISimilar {
    filmId: number,
    kinopoiskId?: number,
    nameRu: string,
    nameEn: string,
    posterUrl: string,
    posterUrlPreview: string,
    ratingKinopoisk: string
}