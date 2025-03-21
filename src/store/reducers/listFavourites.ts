import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IFavourite} from "@/types/IState";

interface favouritesState {
    list: IFavourite[] | undefined;
}

const initialState:favouritesState = {
    list: [] ,
};

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        deleteFavourites: (state, action: PayloadAction<IFavourite>) => {
            state.list = state.list?.filter((item) => {
                if (item.id !== undefined) return item.id !== action.payload.id
            });
        },
        addFavourite: (state, action: PayloadAction<IFavourite>) => {
            if (!state.list?.find(
                (item) =>
                    item.id === action.payload.id)) {
                state.list?.push(action.payload);
            }
        }
    },
});

export const { deleteFavourites, addFavourite} = favouritesSlice.actions;

export default favouritesSlice.reducer;