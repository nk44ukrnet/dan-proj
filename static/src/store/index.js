import React from 'react';
import {createSlice, configureStore, createAsyncThunk} from "@reduxjs/toolkit";
import {storageMiddleware} from "./StorageMiddleware.js";

const itemSlice = createSlice({
    name: 'items',
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        session: JSON.parse(localStorage.getItem("session")) || null,
        darkMode: false,
    },
    reducers: {
        setUser: (state, action) => {
          state.user = action.payload;
        },
        setSession: (state, action) => {
            state.session = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.session = null;
        },
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        }
    },
});


export const {
    setUser,
    setSession,
    logout,
    toggleDarkMode
} = itemSlice.actions;

const store = configureStore({
    reducer: itemSlice.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storageMiddleware),
});

export const itemReducer = itemSlice.reducer;
export default store;
