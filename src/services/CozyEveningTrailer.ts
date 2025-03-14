
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TRAILER_KEY, TRAILER_URL} from '@constants/trailerApi';
import {IAbout} from '@/types/IAbout';

export const cozyeveningAPI1  = createApi({
    reducerPath: 'cozyeveningAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: TRAILER_URL,
        headers: {
            'X-API-KEY': TRAILER_KEY,
        },
    }),

    endpoints: (build) => ({
        getInfoTrailer: build.query<object, string | undefined >({
            query: (id)=>(id && id !== '0' ? `/movie/${id}`: undefined),
        })
    }),
})

export const {useGetInfoTrailerQuery} = cozyeveningAPI1;
