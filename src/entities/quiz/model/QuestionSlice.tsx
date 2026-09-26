import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { QuestionInitial, QuestionChecked } from "./types";

 export const initialState : QuestionInitial= {
    mas:[]
}

export const QuestionSlice=createSlice({
    name:'resultquestion',
    initialState,
    reducers:{
        AddQuestion:(state,action:PayloadAction<QuestionChecked>) =>{
            state.mas.push(action.payload);
        },
         ResetQuestions(state) { state.mas = []; },
    }

});

export const {AddQuestion,ResetQuestions}=QuestionSlice.actions;
export default QuestionSlice.reducer;