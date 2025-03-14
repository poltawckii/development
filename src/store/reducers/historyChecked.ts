import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface historyState {
    history: [] | undefined;
}

const initialState: historyState = {
    history: [],
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        deleteHistory: (state, action: PayloadAction<{}>) => {
            state.history = state.history.filter((item) => item.id !== action.payload.id);
        },
        addHistory: (state, action: PayloadAction<{url: string | undefined, id: string}>) => {
            if (!state.history.find((item) => item.id === action.payload.id)) {
                state.history.push(action.payload);
            }
            else {
                state.history = state.history.filter((item) => item.id !== action.payload.id);
                state.history.push(action.payload);
            }
        }
    },
});

export const { deleteHistory, addHistory } = historySlice.actions;

export default historySlice.reducer;