
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL, API_KEY} from '@constants/api';
import {IAbout} from '@/types/IAbout';
import {IActors} from "@/types/IActors";
import {ISimilars} from "@/types/ISimilars";
import {ICarouse} from "@/types/IState";
    export const cozyeveningAPI  = createApi({
        reducerPath: 'cozyeveningAPI',
        refetchOnFocus: true,
        baseQuery: fetchBaseQuery({
            baseUrl: API_URL,
            headers: {
                'X-API-KEY': API_KEY,
            },
        }),

            endpoints: (build) => ({
                getInfoAbout: build.query<IAbout, number | undefined >({
                    query: (id) => (id && id !== 0 ? `/v2.2/films/${id}` : ''),
                }),
                getInfoActors: build.query<IActors, number | undefined >({
                    query: (id)=>(id && id !== 0 ? `/v1/staff?filmId=${id}`: ''),
                }),
                getInfoCarousel: build.query<ICarouse | ISimilars, number | undefined >({
                    query: (num)=> `/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${num}`, // Нужно сохранять num в стейте
                }),
                getInfoSimilar: build.query<ISimilars, number | undefined >({
                    query: (id)=>(id && id !== 0 ? `/v2.2/films/${id}/similars`: ''),
                })
        }),
    })

export const {useGetInfoAboutQuery, useGetInfoActorsQuery, useGetInfoCarouselQuery, useGetInfoSimilarQuery} = cozyeveningAPI;
