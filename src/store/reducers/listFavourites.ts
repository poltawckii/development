import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface favouritesState {
    list: string[] | undefined;
}

const initialState:favouritesState = {
    list: [] ,
};

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        deleteFavourites: (state, action: PayloadAction<{}>) => {
            state.list = state.list.filter((item) => item.id !== action.payload.id);
        },
        addFavourite: (state, action: PayloadAction<string>) => {
            if (!state.list.find(
                (item) =>
                    item.id === action.payload.id)) {
                state.list.push(action.payload);
            }
        }
    },
});

export const { deleteFavourites, addFavourite, addId, deleteId } = favouritesSlice.actions;

export default favouritesSlice.reducer;