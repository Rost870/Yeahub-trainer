import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


export interface QuestionChecked{
    question:string;
    know:boolean;
    id:number;
    skills?: { id: number; title: string }[];
}

export interface QuestionInitial{
    mas:QuestionChecked[];
}
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