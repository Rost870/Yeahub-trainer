
import { MyError } from '@/shared/ui';
import { useGetNewQuizzQuery, type QuestionChecked } from '@/entities/quiz';
import { type RootState } from '@/app/appStore';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import './Diagram.css';
function Diagram(){
    const [params]=useSearchParams();
    const mas = useSelector((state: RootState) => state.resultquestion.mas);
    const correctAnswers=mas?.filter((item:QuestionChecked)=>item.know==true).length;
    const specialization=Number(params.get("specialization"));
    const complexity=params.get('complexity')?.split(",").map(Number);
    const limit=Number(params.get('limit'));
    const skills=params.get('skills')?.split(",");
    const {data,isError}=useGetNewQuizzQuery({
        specialization,
        complexity,
        limit,
        skills
    });
    const totalQuestions=data?.questions.length || 0;
    if (isError || data?.questions?.length==0 || specialization==0)return <MyError />
    const knownPercent = totalQuestions === 0 ? 0 : Math.round((correctAnswers / totalQuestions) * 100);
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - knownPercent / 100);

    return(
        <div className="Diagram_chart">
                <p className="Diagram_header">Статистика пройденных вопросов</p>

                <div className="Diagram_donut">
                    <svg viewBox="0 0 120 120" className="Diagram_svg">
                    <circle className="Diagram_track" cx="60" cy="60" r={radius} />
                    <circle
                        className="Diagram_progress"
                        cx="60" cy="60" r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                    />
                    </svg>

            <div className="Diagram_center">
            <p className="Diagram_percent">{knownPercent}%</p>
            <p className="Diagram_label">Изучено</p>
            </div>
        </div>
        </div>
    )
}

export default Diagram;