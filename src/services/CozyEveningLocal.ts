import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {setToken} from "@/store/reducers/tokenSlice";
import {IUser} from "@/types/IUser";

// Определяем API
export const cozyeveningAPI2 = createApi({
    reducerPath: 'cozyeveningAPI2', // Уникальное имя для редюсера в Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000', // Базовый URL из вашего запроса
    }),
    endpoints: (build) => ({
        postRegistr: build.mutation({
            query: ({ eMail, password }) => ({
                url: '/auth/registration', // Эндпоинт
                method: 'POST',
                body: { eMail, password }, // Тело запроса
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }),
        }),
        postLogin: build.mutation({
            query: ({ eMail, password }) => ({
                url: '/api/auth/login', // Эндпоинт
                method: 'POST',
                body: { eMail, password }, // Тело запроса
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setToken(data));
                    localStorage.setItem('token', data.token);
                } catch (error) {
                    // Error handling
                }
            },
        }),
        postAvatar: build.mutation({
            query: ({eMail, url} : {eMail: string | undefined, url: string | undefined}) => ({
                url: '/api/auth/avatar', // Эндпоинт
                method: 'POST',
                body: { url, eMail }, // Тело запроса
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    dispatch(setToken(data.user));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        getLogin: build.query<IUser, void >({
            query: () => ({
                url: '/api/auth/auth',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setToken(data));
                    (data.token) && localStorage.setItem('token', data.token);
                } catch (error) {
                    console.log(error)
                    localStorage.removeItem('token')
                }
            },
        }),
    }),
});

export const { useGetLoginQuery, usePostAvatarMutation, usePostLoginMutation, usePostRegistrMutation,useLazyGetLoginQuery } = cozyeveningAPI2;
