import { createSlice } from '@reduxjs/toolkit';
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
    token: null,
    name: "",
    id: "",
    avatarURL: "",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getUser(state, {payload}) {
            state.token = payload.token;
            state.name = payload.user.name;
            state.id = payload.user.id;
            state.avatarURL = payload.user.avatarURL;
        },
        clearToken(state) {
            state.token = null;
        },
        getAvatarURL(state, {payload}) {
            state.avatarURL = payload;
        },
    },
});

export const persistedAuthReducer = persistReducer(
    {
        key:"token",
        storage
    },
    authSlice.reducer
    );

export const {
    getUser,
    clearToken,
    getAvatarURL
} = authSlice.actions

export const selectToken = (state) => state.auth.token;
export const selectName = (state) => state.auth.name;
export const selectId = (state) => state.auth.id;
export const selectAvatarURL = (state) => state.auth.avatarURL;