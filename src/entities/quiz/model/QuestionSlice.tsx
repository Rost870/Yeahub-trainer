import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AddAnswerPayload, QuestionChecked, QuestionInitial, QuizQuestion ,Session} from "./types";
const savedSession=localStorage.getItem('quizz_session');

const loadSavedSession=():Session | null=>{
    try{
        const raw=localStorage.getItem("quizz_session");
        if(!raw)return null;
        const parsed : Session=JSON.parse(raw);
        const validate=parsed && typeof parsed=='object' && typeof parsed.id=='string' && Array.isArray(parsed.answers) && Array.isArray(parsed.questions) && typeof parsed.isFinished=='boolean';
        if(!validate){
            localStorage.removeItem('quizz_session');
            return null;
        }
        return parsed;

    }catch(error){
        console.log("Ошибка чтения сессии",error);
        localStorage.removeItem("quizz_session");
        return null;
    }

}

 export const initialState : QuestionInitial= {
    currentSession:loadSavedSession(),
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
            
        },

        addAnswer:(state,action:PayloadAction<AddAnswerPayload>)=>{
            const session = state.currentSession;
            if(!session) return;

         
            if(session.isFinished) return;

          
            if(action.payload.sessionId !== session.id) return;

      
            const isQuestionInSession = session.questions.some((q) => q.id === action.payload.id);
            if(!isQuestionInSession) return;

        
            const existingIndex = session.answers.findIndex((a) => a.id === action.payload.id);
            const answerData: QuestionChecked = {
                id: action.payload.id,
                question: action.payload.question,
                know: action.payload.know,
                skills: action.payload.skills,
            };

            if(existingIndex !== -1){
                session.answers[existingIndex] = answerData;
            } else {
                session.answers.push(answerData);
            }

        },
        finishSession:(state, action: PayloadAction<{ sessionId?: string } | undefined>)=>{
            if(state.currentSession){
                if(action.payload?.sessionId && action.payload.sessionId !== state.currentSession.id){
                    return;
                }
                state.currentSession.isFinished=true;
           
            }
        },

        resetSession:(state)=>{
            state.currentSession=null;
           
        },
    }

});
export const {addAnswer,startSession,finishSession,resetSession}=QuestionSlice.actions;

export default QuestionSlice.reducer;