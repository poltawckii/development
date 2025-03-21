import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICarousel} from "@/types/IState";


const initialState: ICarousel = {
    carousel1: undefined ,
    carousel2: undefined
};

export const carouselSlice = createSlice({
    name: 'carousel',
    initialState,
    reducers: {
        setCarousel1: (state, action: PayloadAction<any>) => {
            state.carousel1 = action.payload;
        },
        setCarousel2: (state, action: PayloadAction<any>) => {
            state.carousel2 = action.payload;
        },
    },
});

export const { setCarousel1, setCarousel2 } = carouselSlice.actions;

export default carouselSlice.reducer;