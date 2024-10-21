import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store"; 

export interface Permission {
    name: string;
}

export interface AuthoriState {
    permissions: Permission[];
}

const initialPermission = JSON.parse(localStorage.getItem('permissions') || '[]');

const initialState: AuthoriState = {
    permissions: initialPermission
};

const authouziSlice = createSlice({
    name: 'authouri',
    initialState,
    reducers: {
        addAuthori: (state, action) => {
            state.permissions = []; 
            action.payload.permissions.forEach((newPermission: Permission) => {
                state.permissions.push(newPermission);
            });
            localStorage.setItem('permissions', JSON.stringify(state.permissions)); 
        },
        clearAuthori: (state) => {
            state.permissions = [];
            localStorage.removeItem('permissions');
        },
    },
});

export const authouziReducer = authouziSlice.reducer;
export const { addAuthori, clearAuthori } = authouziSlice.actions;

export const authoriSelector = (state: RootState) => state.authouzi.permissions; 
