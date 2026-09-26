import type { MockQuizResponse } from "@/entities/quiz"

export interface Props{
    data?:MockQuizResponse;
    index:number;
    limit:number;
    progressPercent:number;
}


export function QuestionProgress({data,limit,progressPercent,index}:Props){
    return(
        <div className="Questions_container_first">
                    <div className="Questions_progress">
                        <div className="Questions_first">
                            <p className="Questions_first_text">Вопросы Собеседования</p>
                            <span className="Questions_first_list">{index}/{data?.questions.length || limit}</span>
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