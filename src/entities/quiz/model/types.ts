export interface QuestionChecked{
    question:string;
    know:boolean;
    id:number;
    skills?: { id: number; title: string }[];
}
export interface Session{
    id:string;
    questions:QuizQuestion[];
    answers:QuestionChecked[];
    isFinished:boolean;
}
export interface QuestionInitial{
    currentSession:Session | null;
}

export interface QuizzProps{
    skills?:string[];
    complexity?:number[];
    specialization:number;
    limit?:number;

}

export interface QuizQuestion {
  id: number;
  title: string;
  description: string;
  code?: string;
  imageSrc?: string;
  shortAnswer?: string;
  longAnswer?: string;
  complexity: number;
  questionSkills: { id: number; title: string }[];
}

export interface MockQuizResponse {
  id: string;
  fullCount: number;
  questions: QuizQuestion[];
}
export interface Spec{
    id:number;
    title:string;
    slug:string;
    description:string;
    imageSrc:string;
}
export interface SpecProps{
    page?:number;
    limit?:number;
    title?:string;
}
export interface SpecReturn{
    data:Spec[];
    page?: number;
    limit?: number;
    total?: number;
}


export interface SkillsProps{
    page?:number;
    limit?:number;
    title?:string;
}

export interface SkillsReturn{
    data:Skill[];
    page?: number;
    limit?: number;
    total?: number;
}
export interface Skill{
    id:number;
    title:string;
    description:string;
    imageSrc:string;
    specializations?: { id: number; title: string; slug: string }[];
}