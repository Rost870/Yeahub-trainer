import MyError from "@/Error/MyError";
import Loading from "@/Loading/Loading";
import { useGetNewQuizzQuery } from "@/redux/api";
import { ResetQuestions, type QuestionChecked, AddQuestion } from "@/redux/QuestionSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate, useLocation, Link } from "react-router-dom";

function Questions(){
    const dispatch=useDispatch();
    const [showAnswer,setAnswer]=useState(false);
    const [index,SetIndex]=useState(0);
    const [params]=useSearchParams();
    const naviate=useNavigate();
    const location=useLocation();
    const specialization=Number(params.get("specialization"));
    const complexity=params.get('complexity')?.split(",").map(Number);
    const limit=Number(params.get('limit'));
    const skills=params.get('skills')?.split(",");
    useEffect(() => {
        dispatch(ResetQuestions());   
    }, []);
    const {data,isLoading,isError}=useGetNewQuizzQuery({
        specialization,
        complexity,
        limit,
        skills
    }, { skip: !specialization || !limit });
    const totalQuestions=data?.questions.length || 0;
    const progressPercent = Math.min(Math.max((index/(data?.questions.length || limit))*100,0),100);
    const handleNext=()=>{
        if (index +1 < totalQuestions){
            SetIndex((prev)=>prev+1);
        }
        else{
           naviate(`/done${location.search}`); 
        }
    }

    const handleTrue=()=>{
        const newQuestion:QuestionChecked={question: data?.questions[index].title || 'Нет названия', know:true,id: data?.questions[index].id || 0,skills:data?.questions[index].questionSkills}
        dispatch(AddQuestion(newQuestion))
        handleNext();
    }
    const handleFalse=()=>{
        const newQuestion:QuestionChecked={question: data?.questions[index].title || 'Нет названия', know:false,id: data?.questions[index].id || 0,skills:data?.questions[index].questionSkills};
        dispatch(AddQuestion(newQuestion));
        handleNext();
    }


    if (isLoading)return (<Loading />)
    if (isError || data?.questions?.length==0 || specialization==0)return <MyError />
    
    return(
        <div className="Questions">
          
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
                <div className="Questions_container">
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
                <Link to={`/done${location.search}`} className="Question_end">Завершить</Link>
            </div>
            
           
        </div>
    )
}


export default Questions;