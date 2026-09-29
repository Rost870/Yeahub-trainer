    import { 
      useGetNewQuizzQuery, 

      addAnswer, 
      finishSession, 
      startSession 
    } from "@/entities/quiz";
    import { useState, useEffect, useMemo } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { useSearchParams, useNavigate } from "react-router-dom";
    import { parseQuizzParams } from "./validateParams";
    import type { RootState } from "@/app/appStore";
    
    export const useQuizzProcess = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const [params] = useSearchParams();
      const [index, setIndex] = useState(0);
    
      const currentSession = useSelector((state: RootState) => state.resultquestion.currentSession);
    
    
      const validatedParams = useMemo(() => parseQuizzParams(params), [params]);
    
     
      const { data, isLoading, isError } = useGetNewQuizzQuery(
        validatedParams ?? { specialization: 0, limit: 0 },
        { skip: !validatedParams, refetchOnMountOrArgChange: true }
      );
  
      useEffect(() => {
        if (!currentSession && data?.questions && data.questions.length > 0) {
          dispatch(startSession({
            id: data.id || Date.now().toString(),
            questions: data.questions,
          }));
        }
      }, [data, currentSession, dispatch]);
    
      const totalQuestions = data?.questions?.length || 0;
      const limit = validatedParams?.limit ?? 0;
      const specialization = validatedParams?.specialization ?? 0;
      const progressPercent = Math.min(Math.max((index / (totalQuestions || limit || 1)) * 100, 0), 100);
    
      const handleNext = () => {
        if (index + 1 < totalQuestions) {
          setIndex((prev) => prev + 1);
        } else {
          dispatch(finishSession());
          navigate('/done');
        }
      };
    
     
      const currentQuestion = data?.questions?.[index] ?? null;
    
      const handleTrue = () => {
        if (!currentQuestion) return;
        dispatch(addAnswer({
          id: currentQuestion.id,
          question: currentQuestion.title,
          know: true,
          skills: currentQuestion.questionSkills,
        }));
        handleNext();
      };
    
      const handleFalse = () => {
        if (!currentQuestion) return;
        dispatch(addAnswer({
          id: currentQuestion.id,
          question: currentQuestion.title,
          know: false,
          skills: currentQuestion.questionSkills,
        }));
        handleNext();
      };
    
      const handleFinish = () => {
        dispatch(finishSession());
        navigate('/done');
      };
    
      return {
        isValidParams: Boolean(validatedParams),
        currentQuestion,
        data,
        isLoading,
        isError,
        index,
        limit,
        totalQuestions,
        progressPercent,
        specialization,  
        handleTrue,
        handleFalse,
        handleFinish,
      };
    };