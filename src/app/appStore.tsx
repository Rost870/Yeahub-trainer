import { configureStore } from "@reduxjs/toolkit";
import { quizApi } from "@/entities/quiz";
import { rootReducer } from "./appReducer";

export const store=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleWare)=>
        getDefaultMiddleWare().concat(quizApi.middleware),
});


export type RootState=ReturnType<typeof store.getState>;