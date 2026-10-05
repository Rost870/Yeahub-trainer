    import { 
      useGetNewQuizzQuery, 
      addAnswer, 
      finishSession, 
      startSession 
    } from "@/entities/quiz";
    import { useEffect, useMemo } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { useSearchParams, useNavigate } from "react-router-dom";
    import { parseQuizzParams } from "./validateParams";
    import type { RootState } from "@/app/appStore";
    
    export const useQuizzProcess = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const [params] = useSearchParams();

      const currentSession = useSelector((state: RootState) => state.resultquestion.currentSession);
      const hasActiveSession = Boolean(currentSession && !currentSession.isFinished);
    
      const validatedParams = useMemo(() => parseQuizzParams(params), [params]);

      useEffect(() => {
        if (currentSession?.isFinished) {
          navigate('/done', { replace: true });
        }
      }, [currentSession?.isFinished, navigate]);
     
      const { data, isLoading, isError } = useGetNewQuizzQuery(
        validatedParams ?? { specialization: 0, limit: 0 },
        { skip: !validatedParams || hasActiveSession, refetchOnMountOrArgChange: true }
      );
      
      useEffect(() => {
        if (!currentSession && data?.questions && data.questions.length > 0) {
          dispatch(startSession({
            id: data.id || Date.now().toString(),
            questions: data.questions,
          }));
        }
      }, [data, currentSession, dispatch]);

      const index = currentSession?.answers.length ?? 0;
      const questions = currentSession?.questions ?? data?.questions ?? [];
      const totalQuestions = questions.length;
      const currentQuestion = questions[index] ?? null;
      const limit = validatedParams?.limit ?? totalQuestions;
      const specialization = validatedParams?.specialization ?? 0;
      const progressPercent = totalQuestions > 0
        ? Math.min(Math.max((index / totalQuestions) * 100, 0), 100)
        : 0;
    
      const handleAnswer = (know: boolean) => {
        if (!currentQuestion || !currentSession) return;
        dispatch(addAnswer({
          sessionId: currentSession.id,
          id: currentQuestion.id,
          question: currentQuestion.title,
          know,
          skills: currentQuestion.questionSkills,
        }));

        if (index + 1 >= totalQuestions) {
          dispatch(finishSession({ sessionId: currentSession.id }));
          navigate('/done');
        }
      };

      const handleTrue = () => handleAnswer(true);
      const handleFalse = () => handleAnswer(false);
    
      const handleFinish = () => {
        if (currentSession) {
          dispatch(finishSession({ sessionId: currentSession.id }));
        } else {
          dispatch(finishSession());
        }
        navigate('/done');
      };
    
      return {
        isValidParams: hasActiveSession || Boolean(validatedParams),
        currentQuestion,
        data,
        questions,
        isLoading: !hasActiveSession && isLoading,
        isError: !hasActiveSession && isError,
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