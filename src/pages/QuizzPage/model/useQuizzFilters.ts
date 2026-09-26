import { useGetSpecQuery, useGetSkillsQuery } from "@/entities/quiz/api/quizApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export interface QuizzFilters{
    specialization:number | null;
    skills:string[];
    complexity:string;
    limit:number;
    mode: 'repeat' | 'new' | 'random';

}
export const useQuizzFilters=()=>{
    const { data: specData, isLoading: isSpecLoading } = useGetSpecQuery();
    
    const { data: skillsData, isLoading: isSkillsLoading } = useGetSkillsQuery();

    const navigate=useNavigate();


    const [filter,SetFilter]=useState<QuizzFilters>({
        specialization:0,
        skills:[],
        complexity:'1,2,3',
        limit:35,
        mode:'random',
    });

    const handleSpec=(id:number)=>{
        SetFilter((prev)=>({
            ...prev,
            specialization:id,
            skills:[],
        }));
    }

    const handeSkills=(id:string)=>{
        SetFilter((prev)=>({
            ...prev,
            skills:[...prev.skills,id]
        }));
    }

    const handleComplexity=(complexity:string)=>{
        SetFilter((prev)=>({
            ...prev,
            complexity:complexity,
        }));
    };

    const handeIncrement=()=>{
        SetFilter((prev)=>({
            ...prev,
            limit:filter.limit+1,
        }));
    };
    const handeDecrement=()=>{
        SetFilter((prev)=>({
            ...prev,
            limit:filter.limit-1,
        }));
    };
    const handleStart=()=>{
        const params:Record<string,string>={
            specialization:String(filter.specialization),
            limit:String(filter.limit),
            complexity:String(filter.complexity),
        };
        if(filter.skills && filter.skills.length>0 ){
            params.skills=filter.skills.join(",");
        }
        const searchParams=new URLSearchParams(params);
        navigate(`/questions?${searchParams.toString()}`);
    }

    return {
        filter,
        handleSpec,
        handeSkills,
        isSpecLoading,
        isSkillsLoading,
        specData,
        skillsData,
        SetFilter,
        handleComplexity,
        handeIncrement,
        handeDecrement,
        handleStart,
  };

}