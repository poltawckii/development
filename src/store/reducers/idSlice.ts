import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IdState {
    id: number | undefined;
}

const initialState: IdState = {
    id: undefined,
};

export const idSlice = createSlice({
    name: 'id',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<number | undefined>) => {
            state.id = action.payload;
        },
    },
});

export const { setId } = idSlice.actions;

export default idSlice.reducer;