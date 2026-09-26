import { type RootState } from '@/app/appStore';
import { Loading, MyError } from '@/shared/ui';
import { useGetNewQuizzQuery, type QuestionChecked } from '@/entities/quiz';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Diagram from './Diagram/Diagram';
import './ResultPage.css';
import SkillsInfo from './SkillsInfo/SkillsInfo';
function Result(){
    const [params]=useSearchParams();
    const mas = useSelector((state: RootState) => state.resultquestion.mas);
    const correctAnswers=mas?.filter((item:QuestionChecked)=>item.know==true).length;
    const specialization=Number(params.get("specialization"));
    const complexity=params.get('complexity')?.split(",").map(Number);
    const limit=Number(params.get('limit'));
    const skills=params.get('skills')?.split(",");
    const {data,isLoading,isError}=useGetNewQuizzQuery({
        specialization,
        complexity,
        limit,
        skills
    });
    const totalQuestions=data?.questions.length || 0;
    const knownPercent = totalQuestions === 0 ? 0 : Math.round((correctAnswers / totalQuestions) * 100);
    const unknowPercent=100-knownPercent;
    if (isError || data?.questions?.length==0 || specialization==0)return <MyError />
    if (isLoading)return (<Loading />)
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
            
                        {mas?.map((item:QuestionChecked)=>{
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