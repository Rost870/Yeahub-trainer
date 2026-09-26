export interface QuestionChecked{
    question:string;
    know:boolean;
    id:number;
    skills?: { id: number; title: string }[];
}

export interface QuestionInitial{
    mas:QuestionChecked[];
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
}


export interface SkillsProps{
    page?:number;
    limit?:number;
    title?:string;
}

export interface SkillsReturn{
    data:Skill[];
}
export interface Skill{
    id:number;
    title:string;
    description:string;
    imageSrc:string;
}