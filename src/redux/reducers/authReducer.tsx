import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    token: string;
    _id: string;
    name: string;
    rule: string;
}

const initialState: AuthState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') ?? '' : '',
    _id: '',
    name: '',
    rule: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        addAuth: (state, action) => {
            state.token = action.payload.token;
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.rule = action.payload.rule;
            localStorage.setItem('token', action.payload.token);
        },
        clearAuth: (state) => {
            state.token = '';
            state._id = '';
            state.name = '';
            state.rule = '';
            localStorage.removeItem('token'); 
        },
    },
});

export const authReducer = authSlice.reducer;
export const { addAuth, clearAuth } = authSlice.actions;
export const authSelector = (state: any) => state.auth;
