import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MockQuizResponse, QuizzProps, SpecReturn, SpecProps, SkillsReturn, SkillsProps } from "../model/types";


export const quizApi=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:'https://api.yeatwork.ru'}),
    endpoints:(builder)=>({
        getNewQuizz:builder.query<MockQuizResponse,QuizzProps>({
            query:(params)=>({
                url:'/interview-preparation/quizzes/mock/new',
                method:'GET',
                params,
            }),
        }),
        getSpec:builder.query<SpecReturn,SpecProps | void>({
            query:()=>({
                url:'/specializations',
                method:"GET",
            })
        }),
        getSkills:builder.query<SkillsReturn,SkillsProps | void>({
            query:()=>({
                url:'/skills',
                method:"GET",
            })
        })

    })
});
export const {useGetNewQuizzQuery,useGetSkillsQuery,useGetSpecQuery}=quizApi;