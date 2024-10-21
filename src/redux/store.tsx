import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer'; 
import { authouziReducer } from './reducers/authouziReducer'; 

const store = configureStore({
    reducer: {
        auth: authReducer,
        authouzi: authouziReducer, 
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
