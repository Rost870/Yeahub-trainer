import { useState } from "react"
import type { MockQuizResponse } from "../../model/types";
  export interface Props {
        data?: MockQuizResponse;
        index: number;
        handleTrue: () => void;
        handleFalse: () => void;
    }


export function QuestionCard({data,index,handleFalse,handleTrue}:Props){
    const [showAnswer,setAnswer]=useState(false)
    return(
        <div className="Question">
                    <div className="Question_left">
                        <div>
                            <p className="Question_title"><svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="4" cy="4" r="4" fill="#5533FF"/>
                                </svg>
                                <span>{ data?.questions[index]?.title || "Нет названия"}</span>
                            </p>
                            {   showAnswer &&
                                
                            <p className="Question_description">{data?.questions[index].description || 'Нет ответа'}</p>
                                

                            }
                            <button onClick={()=>setAnswer((prev)=>!prev)} className="Question_answer">{showAnswer ? 'Скрыть ответ' : 'Посмотреть ответ'}</button>
                        </div>
                            <div className="buttons">
                                <button  className="Question_button_false" onClick={()=>handleFalse()}> <img src='questionUnlike.svg'/> Не знаю
                                </button>
                                <button className="Question_button_true" onClick={()=>handleTrue()}> <img src='questionLike.svg'/> Знаю 
                                </button>
                            
                        </div>
                    </div>
                    <img src='mockImage.jpg' />

                </div>
    )
}