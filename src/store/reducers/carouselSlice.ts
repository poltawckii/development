import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface carouselState {
    carousel: {
        items: [],
        total: number,
        totalPages: number
    } | undefined;
}

const initialState: carouselState = {
    carousel: undefined ,
};

export const carouselSlice = createSlice({
    name: 'carousel',
    initialState,
    reducers: {
        setCarousel: (state, action: PayloadAction<object | undefined>) => {
            state.carousel = action.payload;
            state.isCarousel = true;
            state.isResponse = true;
        },
        deleteCarousel: (state, action: PayloadAction<object | undefined>) => {
            state.carousel = undefined;
            state.isCarousel = false;
        }
    },
});

export const { setCarousel, deleteCarousel } = carouselSlice.actions;

export default carouselSlice.reducer;