import { api } from "@/redux/api";
import { combineReducers } from "@reduxjs/toolkit";
import questionReducer from "@/redux/QuestionSlice";


export const rootReducer=combineReducers({
     resultquestion:questionReducer,
        [api.reducerPath]:api.reducer,
})