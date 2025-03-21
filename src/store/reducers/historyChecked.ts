import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IFavourite, IHistory} from "@/types/IState";


const initialState: IHistory = {
    history: [],
};
export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        deleteHistory: (state, action: PayloadAction<IFavourite>
        ) => {
            state.history = state.history.filter((item) => item.id !== action.payload.id);
        },
        addHistory: (state, action: PayloadAction<IFavourite>
        ) => {
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