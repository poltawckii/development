"use client";
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { cozyeveningAPI } from "@/services/CozyEveningService";
import idReducer from './reducers/idSlice';
import {cozyeveningAPI1} from "@/services/CozyEveningTrailer";
import tokenReducer from './reducers/tokenSlice';
import carouselReducer from "./reducers/carouselSlice";
import favouritesReducer from "./reducers/listFavourites"
import historyReducer from "@/store/reducers/historyChecked";
import swapReducer from "@/store/reducers/listsSwap";
// Определение типа стора
const rootReducer = combineReducers({
    [cozyeveningAPI.reducerPath]: cozyeveningAPI.reducer,
    id: idReducer,
    [cozyeveningAPI1.reducerPath]: cozyeveningAPI.reducer,
    token: tokenReducer,
    carousel: carouselReducer,
    favourites: favouritesReducer,
    history: historyReducer,
    swap: swapReducer
});
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('favourites');
        const historyState = localStorage.getItem('history');
        if (historyState === null && serializedState === null) {
            return undefined;
        }
        else if (historyState && serializedState) {
            return { favourites: JSON.parse(serializedState), history: JSON.parse(historyState) }; // Если всё есть, вернём всё
        }
        else if (historyState === null) {
            return { favourites: JSON.parse(serializedState) }; // Если ничего нет, вернём undefined
        }
        else if (serializedState === null) {
            return { history: JSON.parse(historyState) }; // Если ничего нет, вернём undefined
        }
    } catch (err) {
        console.error('Ошибка загрузки состояния:', err);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state.favourites); // Сохраняем только favourites
        const historyState = JSON.stringify(state.history);
        localStorage.setItem('history', historyState);
        localStorage.setItem('favourites', serializedState);
    } catch (err) {
        console.error('Ошибка сохранения состояния:', err);
    }
};
export const initStore = () => {
    const preloadedState = loadState();
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cozyeveningAPI.middleware, cozyeveningAPI1.middleware),
    });
    store.subscribe(() => {
        saveState(store.getState());
    });
    return store;
}

export type AppStore = ReturnType<typeof initStore>; // выводим тип стора
export type RootState = ReturnType<AppStore['getState']>; // выводим тип состояния
export type AppDispatch = AppStore['dispatch']; // выводим тип диспатча

export const wrapper = createWrapper<AppStore>(initStore, { debug: false });
