import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IUser, IUserState} from "@/types/IUser";


const initialState: IUserState = {
    token: undefined ,
    isAuth: false,
    user: undefined
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<IUser>) => {
            state.token = action.payload?.token;
            state.user = action.payload?.user;
            state.isAuth = true;
        },
        deleteToken: (state) => {
            state.token = undefined;
            state.user = undefined;
            state.isAuth = false;
        }
    },
});

export const { setToken, deleteToken } = tokenSlice.actions;

export default tokenSlice.reducer;