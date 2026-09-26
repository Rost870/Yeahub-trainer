export {
  quizApi,
  useGetNewQuizzQuery,
  useGetSpecQuery,
  useGetSkillsQuery,
} from './api/quizApi';

export {
  default as questionReducer,
  AddQuestion,
  ResetQuestions,
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