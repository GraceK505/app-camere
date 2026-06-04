import {configureStore} from "@reduxjs/toolkit";
import dropReducer from "./dropSlice";
import authReducer from "./authSlice";


export const store = configureStore({
    reducer: {
        drop: dropReducer,
        auth: authReducer,
    },
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

