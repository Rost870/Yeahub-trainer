import type { MockQuizResponse } from "@/entities/quiz"

export interface Props{
    data?:MockQuizResponse;
    index:number;
    limit:number;
    totalQuestions?:number;
    progressPercent:number;
}


export function QuestionProgress({data,limit,progressPercent,index,totalQuestions}:Props){
    const total = totalQuestions ?? data?.questions.length ?? limit;
    return(
        <div className="Questions_container_first">
                    <div className="Questions_progress">
                        <div className="Questions_first">
                            <p className="Questions_first_text">Вопросы Собеседования</p>
                            <span className="Questions_first_list">{index}/{total}</span>
                        </div>
                    </div>
                    <div className="progress-track">
                        <div 
                        className="progress-fill" 
                        style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
    )
}