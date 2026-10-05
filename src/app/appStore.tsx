import { configureStore } from "@reduxjs/toolkit";
import { quizApi } from "@/entities/quiz";
import { rootReducer } from "./appReducer";

export const store=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleWare)=>
        getDefaultMiddleWare().concat(quizApi.middleware),
});


store.subscribe(()=>{
    try{
        const session=store.getState().resultquestion.currentSession;
        if(session){
            localStorage.setItem("quizz_session",JSON.stringify(session));
        }else{
            localStorage.removeItem("quizz_session");
        }
    }catch(error){
        console.log("Ошибка в сохранении localStorage",error);
    }
})

export type RootState=ReturnType<typeof store.getState>;