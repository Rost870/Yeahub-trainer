import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { QuestionChecked, QuestionInitial, QuizQuestion } from "./types";
const savedSession=localStorage.getItem('quizz_session');

 export const initialState : QuestionInitial= {
    currentSession:savedSession ? JSON.parse(savedSession) : null,
};

export const QuestionSlice=createSlice({
    name:'resultquestion',
    initialState,
    reducers:{
        startSession:(state,action: PayloadAction<{id:string; questions:QuizQuestion[]}>)=>{
            state.currentSession={
                id:action.payload.id,
                questions:action.payload.questions,
                answers:[],
                isFinished:false,
            };
            localStorage.setItem("quizz_session",JSON.stringify(state.currentSession));
        },

        addAnswer:(state,action:PayloadAction<QuestionChecked>)=>{

            if(state.currentSession){
                state.currentSession.answers.push(action.payload);
            };
            localStorage.setItem('quizz_session',JSON.stringify(state.currentSession));

        },
        finishSession:(state)=>{
            if(state.currentSession){
                state.currentSession.isFinished=true;
                localStorage.setItem('quizz_session',JSON.stringify(state.currentSession));
            }
        },

        resetSession:(state)=>{
            state.currentSession=null;
            localStorage.removeItem('quizz_session');
        },
    }

});
export const {addAnswer,startSession,finishSession,resetSession}=QuestionSlice.actions;

export default QuestionSlice.reducer;