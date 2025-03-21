
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TRAILER_KEY, TRAILER_URL} from '@constants/trailerApi';
import {IAbout} from '@/types/IAbout';
import {ITrailers} from "@/types/ITrailers";
import {INames} from "@/types/INames";
import {IFilters} from "@/types/IFilters";

export const cozyeveningAPI1  = createApi({
    reducerPath: 'cozyeveningAPI1',
    baseQuery: fetchBaseQuery({
        baseUrl: TRAILER_URL,
        headers: {
            'X-API-KEY': TRAILER_KEY,
        },
    }),

    endpoints: (build) => ({
        getInfoTrailer: build.query<ITrailers, number | undefined >({
            query: (id)=>(id && id !== 0 ? `/movie/${id}`: ''),
        }),
        getName: build.query<INames, string | undefined >({
            query: (name)=>`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=250&query=${name}`,
        }),
        getFilters: build.query<IFilters, string>({
            query: (url)=> url,
        })
    }),
})

export const {useGetInfoTrailerQuery, useLazyGetNameQuery, useLazyGetFiltersQuery} = cozyeveningAPI1;
