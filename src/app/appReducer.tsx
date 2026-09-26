import { quizApi, questionReducer } from "@/entities/quiz";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer=combineReducers({
     resultquestion:questionReducer,
     [quizApi.reducerPath]:quizApi.reducer,
})