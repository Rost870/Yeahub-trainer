import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useGetNewQuizzQuery } from "../redux/api";
import './SkillsInfo.css'
import type { RootState } from "@/app/appStore";


function SkillsInfo() {
    const [params] = useSearchParams();
    const mas = useSelector((state: RootState) => state.resultquestion.mas);

    const specialization = Number(params.get("specialization"));
    const complexity = params.get('complexity')?.split(",").map(Number);
    const limit = Number(params.get('limit'));
    const skills = params.get('skills')?.split(",");

    const { data } = useGetNewQuizzQuery({
        specialization,
        complexity,
        limit,
        skills,
    });

   const skillStats = useMemo(() => {
    if (!data?.questions || !mas) return [];

  
    const totalsMap = new Map<string, number>();
    data.questions.forEach(q => {
        q.questionSkills?.forEach(s => {
            totalsMap.set(s.title, (totalsMap.get(s.title) || 0) + 1);
        });
    });

   
    const correctMap = new Map<string, number>();
    mas.forEach(item => {
        if (!item.know) return;
        item.skills?.forEach(s => {
            correctMap.set(s.title, (correctMap.get(s.title) || 0) + 1);
        });
    });

    return Array.from(totalsMap.entries()).map(([skill, total]) => ({
        skill,
        correct: correctMap.get(skill) || 0,
        total,
    }));
}, [data, mas]);

    

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