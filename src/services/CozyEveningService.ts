
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL, API_KEY} from '@constants/api';
import {IAbout} from '@/types/IAbout';

    export const cozyeveningAPI  = createApi({
        reducerPath: 'cozyeveningAPI',
        baseQuery: fetchBaseQuery({
            baseUrl: API_URL,
            headers: {
                'X-API-KEY': API_KEY,
            },
        }),

            endpoints: (build) => ({
                getInfoAbout: build.query<IAbout, string | undefined >({
                    query: (id) => (id && id !== '0' ? `/v2.2/films/${id}` : undefined),
                }),
                getInfoActors: build.query<IAbout, string | undefined >({
                    query: (id)=>(id && id !== '0' ? `/v1/staff?filmId=${id}`: undefined),
                }),
                getInfoCarousel: build.query<IAbout, number >({
                    query: (num)=> `/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${num}`, // Нужно сохранять num в стейте
                }),
                getInfoSimilar: build.query<IAbout, string | undefined >({
                    query: (id)=>(id && id !== '0' ? `/v2.2/films/${id}/similars`: undefined),
                })
        }),
    })

export const {useGetInfoAboutQuery, useGetInfoActorsQuery, useGetInfoCarouselQuery, useGetInfoSimilarQuery} = cozyeveningAPI;

export const {getInfoAbout, getInfoCarousel, getInfoSimilar, getInfoActors} = cozyeveningAPI.endpoints