export {
  quizApi,
  useGetNewQuizzQuery,
  useGetSpecQuery,
  useGetSkillsQuery,
} from './api/quizApi';

export {
  default as questionReducer,
  startSession,
  resetSession,
  addAnswer,
  finishSession,
} from './model/QuestionSlice';

export { QuestionCard } from './ui/QuestionCard/QuestionCard';

export type {
  QuizQuestion,
  MockQuizResponse,
  QuizzProps,
  QuestionChecked,
  Spec,
  Skill,
} from './model/types';