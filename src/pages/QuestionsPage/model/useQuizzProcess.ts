import { ResetQuestions, useGetNewQuizzQuery, type QuestionChecked, AddQuestion } from "@/entities/quiz";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";



export const useQuizzProcess=()=>{
    const dispatch=useDispatch();
    const [index,SetIndex]=useState(0);
    const [params]=useSearchParams();
    const naviate=useNavigate();
    const location=useLocation();
    const specialization=Number(params.get("specialization"));
    const complexity=params.get('complexity')?.split(",").map(Number);
    const limit=Number(params.get('limit'));
    const skills=params.get('skills')?.split(",");
    useEffect(() => {
        dispatch(ResetQuestions());   
    }, []);
    const {data,isLoading,isError}=useGetNewQuizzQuery({
        specialization,
        complexity,
        limit,
        skills
    }, { skip: !specialization || !limit });
    const totalQuestions=data?.questions.length || 0;
    const progressPercent = Math.min(Math.max((index/(data?.questions.length || limit))*100,0),100);
    const handleNext=()=>{
        if (index +1 < totalQuestions){
            SetIndex((prev)=>prev+1);
        }
        else{
           naviate(`/done${location.search}`); 
        }
    }

    const handleTrue=()=>{
        const newQuestion:QuestionChecked={question: data?.questions[index].title || 'Нет названия', know:true,id: data?.questions[index].id || 0,skills:data?.questions[index].questionSkills}
        dispatch(AddQuestion(newQuestion))
        handleNext();
    }
    const handleFalse=()=>{
        const newQuestion:QuestionChecked={question: data?.questions[index].title || 'Нет названия', know:false,id: data?.questions[index].id || 0,skills:data?.questions[index].questionSkills};
        dispatch(AddQuestion(newQuestion));
        handleNext();
    }


   return {
            data,
            isLoading,
            isError,
            index,
            limit,
            totalQuestions,
            progressPercent,
            specialization,
            location,
            handleTrue,
            handleFalse,
        };
}

