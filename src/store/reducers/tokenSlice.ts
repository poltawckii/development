import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface tokenState {
    token: string | undefined;
}

const initialState: tokenState = {
    token: undefined ,
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | undefined>) => {
            state.token = action.payload?.token;
            state.currentUser = action.payload?.user;
            state.isAuth = true;
        },
        deleteToken: (state, action: PayloadAction<string | undefined>) => {
            state.token = undefined;
            state.currentUser = undefined;
            state.isAuth = false;
        }
    },
});

export const { setToken, deleteToken } = tokenSlice.actions;

export default tokenSlice.reducer;