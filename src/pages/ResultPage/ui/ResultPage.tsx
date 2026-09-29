import type { QuestionChecked } from "@/entities/quiz";
import { MyError  } from "@/shared/ui";
import type { RootState } from "@/app/appStore";
import { useSelector } from "react-redux";
import Diagram from "./Diagram/Diagram";
import SkillsInfo from "./SkillsInfo/SkillsInfo";
import './ResultPage.css'
import ErrorDiagram from "./ErrorDiagram/ErrorDiagram";
function Result(){
    const currentSession=useSelector((state:RootState)=>state.resultquestion.currentSession);
    const correctAnswers=currentSession?.answers.filter(item=>item.know).length || 0;
    const unCorrectAnswers=currentSession?.answers.filter(item=>!item.know).length || 0;
    const totalQuestions=correctAnswers+unCorrectAnswers;
    const knownPercent = totalQuestions === 0 ? 0 : Math.round((correctAnswers / totalQuestions) * 100);
    const unknowPercent = totalQuestions === 0 ? 0 : 100 - knownPercent;
    if (currentSession?.questions?.length==0 )return <MyError />
    if (!currentSession || !currentSession.isFinished)return (<ErrorDiagram />)
    return(
        <div className="Result">
            
                <div className="Result_container">
                    <div className="Result_fullStatistics">
                        <div className="Result_stats">
                            <Diagram />
                            <div className="Result_stats_knows">
                                <div className="Result_know">
                                    <div className="Rusult_green"></div>
                                    <div className="Result_know_text">
                                        <p className="Result_know_header">Знаю</p>
                                        <p className="Result_know_precent">{knownPercent} % </p>
                                    </div>
                                </div>

                                <div className="Result_know">
                                    <div className="Rusult_red"></div>
                                    <div className="Result_know_text">
                                        <p className="Result_know_header">Не знаю</p>
                                        <p className="Result_know_precent">{unknowPercent} % </p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>


                        <div>
                            <SkillsInfo />
                        </div>
                    </div>
                    <div className="Result_questions">
                        
                         <p className="Result_questions_header">Список пройденных Собеседованиий</p>
            
                        {currentSession.answers?.map((item:QuestionChecked)=>{
                            return (<div className="Result_question" key={item.question}>
                                                        
                                    <img src='/questionImage.jpg' />
                                    <div className="Question_stats">
                                        <p className="Question_title">{item.question}</p>
                                        <p className={item.know ? "Question_know_true" : "Question_know_false"}>
                                            {item.know ? (
                                            <span className="Question_text">
                                                <img src="/like.png" alt="" className="Question_icon" />
                                                Знаю
                                            </span>
                                            ) : (
                                           <span className="Question_text">
                                                <img src="/unlike.png" alt="" className="Question_icon" />
                                                Не знаю
                                            </span>
                                            )}
                                        </p>
                                    </div>

                            </div>)
                        })}
                    </div>

                </div>
            
            
        </div>
    )
}

export default Result;