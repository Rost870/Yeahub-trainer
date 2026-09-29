
import { MyError } from '@/shared/ui';
import type { RootState } from '@/app/appStore';
import { useSelector } from 'react-redux';
import './Diagram.css';

function Diagram(){
    const currentSession=useSelector((state:RootState)=>state.resultquestion.currentSession);
    const correctAnswers=currentSession?.answers.filter(item=>item.know).length || 0;
    const unCorrectAnswers=currentSession?.answers.filter(item=>!item.know).length || 0;
    const totalQuestions=correctAnswers+unCorrectAnswers;
    if (currentSession?.questions?.length==0)return <MyError />
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