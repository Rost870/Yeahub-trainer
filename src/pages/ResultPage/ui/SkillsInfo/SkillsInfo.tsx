import type { QuestionChecked } from "@/entities/quiz";
import type { RootState } from "@/app/appStore";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import './SkillsInfo.css'

function SkillsInfo() {
    const currentSession=useSelector((state:RootState)=>state.resultquestion.currentSession);

   
    const skillStats = useMemo(() => {
        if (!currentSession?.answers || currentSession.answers.length === 0) return [];

        const totalsMap = new Map<string, number>();
        const correctMap = new Map<string, number>();

        
        currentSession.answers.forEach((item: QuestionChecked) => {
            item.skills?.forEach((s: { id: number; title: string }) => {
                
                totalsMap.set(s.title, (totalsMap.get(s.title) || 0) + 1);

               
                if (item.know) {
                    correctMap.set(s.title, (correctMap.get(s.title) || 0) + 1);
                }
            });
        });

        return Array.from(totalsMap.entries()).map(([skill, total]) => ({
            skill,
            correct: correctMap.get(skill) || 0,
            total,
        }));
    }, [currentSession]);

    

    return (
        <div className="Skills_info">
            <p className="Skills_info_header">Прогресс обучения по навыкам</p>
            {skillStats.map(({ skill, correct, total }) => (
                <div key={skill} className="Skill_progress">
                    <div className="Skill_header">
                        <span>{skill}</span>
                        <span>{correct}/{total}</span>
                    </div>
                    <div className="Skill_bar">
                        <div
                            className="Skill_bar_fill"
                            style={{ width: `${total === 0 ? 0 : (correct / total) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SkillsInfo;