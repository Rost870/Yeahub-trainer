import { resetSession } from "@/entities/quiz";
import { useGetSpecQuery, useGetSkillsQuery } from "@/entities/quiz/api/quizApi";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export interface QuizzFilters{
    specialization:number | null;
    skills:string[];
    complexity:string;
    limit:number;
    mode: 'repeat' | 'new' | 'random';

}
export const useQuizzFilters=()=>{
    const LIMIT_MIN = 1;
    const LIMIT_MAX = 40;
    const { data: specData, isLoading: isSpecLoading , isError:isSpecError} = useGetSpecQuery({limit:15});
    const dispatch=useDispatch();
    const { data: skillsData, isLoading: isSkillsLoading ,isError:isSkillsError} = useGetSkillsQuery({limit:100});
    const isError=isSpecError || isSkillsError;
    const navigate=useNavigate();


    const [filter,SetFilter]=useState<QuizzFilters>({
        specialization:null,
        skills:[],
        complexity:'1,2,3',
        limit:10,
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
            skills:prev.skills.includes(id) ? prev.skills.filter((item)=>item!=id) : [...prev.skills,id],
        }));
    }

    const handleComplexity=(complexity:string)=>{
        SetFilter((prev)=>({
            ...prev,
            complexity:complexity,
        }));
    };

    const handeIncrement=()=>{
        if(filter.limit>=LIMIT_MAX){
            return
        }
        SetFilter((prev)=>({
            ...prev,
            limit:prev.limit+1,
        }));
    };
    const handeDecrement=()=>{
        if(filter.limit<=LIMIT_MIN){
            return
        }
        SetFilter((prev)=>({
            ...prev,
            limit:prev.limit-1,
        }));
    };
    const availableSkills=useMemo(()=>{
        if(!filter.specialization || !skillsData?.data){
            return [];
        }
        return skillsData.data.filter((skill)=>{
            return skill.specializations?.some((s)=>s.id==filter.specialization)
        })

    },[skillsData,filter.specialization]);

    const canStart=
        !isError &&
        filter.specialization!=null &&
        filter.limit>=LIMIT_MIN && filter.limit<=LIMIT_MAX;
    const handleStart=()=>{
        if(!canStart)return;
        dispatch(resetSession());
        const params:Record<string,string>={
            specialization:String(filter.specialization),
            limit:String(filter.limit),
            complexity:String(filter.complexity),
            mode:filter.mode,
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
        canStart,
        availableSkills,
        SetFilter,
        handleComplexity,
        handeIncrement,
        handeDecrement,
        handleStart,
        isError,
  };

}