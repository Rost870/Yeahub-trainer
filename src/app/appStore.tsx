import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/redux/api";
import { rootReducer } from "./appReducer";

export const store=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleWare)=>
        getDefaultMiddleWare().concat(api.middleware),
});


export type RootState=ReturnType<typeof store.getState>;