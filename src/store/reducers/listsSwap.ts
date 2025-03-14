import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface listsState {
    swap: string | undefined;
}
const initialState:listsState = {
    swap: 'favourites' ,
};
export const listSlice = createSlice({
    name: 'swap',
    initialState,
    reducers: {
        swapList: (state, action: PayloadAction<string>) => {
                state.swap = action.payload;
            }
        }
});

export const { swapList } = listSlice.actions;

export default listSlice.reducer;