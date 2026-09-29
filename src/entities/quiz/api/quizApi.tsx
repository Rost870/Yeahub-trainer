import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MockQuizResponse, QuizzProps, SpecReturn, SpecProps, SkillsReturn, SkillsProps } from "../model/types";
const BASE_URL=import.meta.env.VITE_API_URL || '/api';

export const quizApi=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
    endpoints:(builder)=>({
        getNewQuizz:builder.query<MockQuizResponse,QuizzProps>({
            query:(params)=>({
                url:'/interview-preparation/quizzes/mock/new',
                method:'GET',
                params,
            }),
        }),
        getSpec:builder.query<SpecReturn,SpecProps | void>({
            query:(params)=>({
                url:'/specializations',
                method:"GET",
                params:params || undefined,
            })
        }),
        getSkills:builder.query<SkillsReturn,SkillsProps | void>({
            query:(params)=>({
                url:'/skills',
                method:"GET",
                params:params || undefined,
            })
        })

    })
});
export const {useGetNewQuizzQuery,useGetSkillsQuery,useGetSpecQuery}=quizApi;