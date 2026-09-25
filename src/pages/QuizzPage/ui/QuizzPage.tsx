import Loading from "@/Loading/Loading";
import { useGetSpecQuery, useGetSkillsQuery } from "@/redux/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface QuizzFilters{
    specialization:number | null;
    skills:string[];
    complexity:string;
    limit:number;
    mode: 'repeat' | 'new' | 'random';

}
function Quizz() {
  const { data: specData, isLoading: isSpecLoading } = useGetSpecQuery();
  
  const { data: skillsData, isLoading: isSkillsLoading } = useGetSkillsQuery();
  const navigate=useNavigate();
  const [filter,SetFilter]=useState<QuizzFilters>({
    specialization:0,
    skills:[],
    complexity:'1,2,3',
    limit:35,
    mode:'random',
  });
  const handleSpec=(id:number)=>{
    SetFilter((prev)=>({
        ...prev,
        specialization:id,
        skills:[],
    }));
  }

  const handeSkills=(id:string)=>{
    SetFilter((prev)=>({
        ...prev,
        skills:[...prev.skills,id]
    }));
  }

  const handleComplexity=(complexity:string)=>{
    SetFilter((prev)=>({
        ...prev,
        complexity:complexity,
    }));
  };

  const handeIncrement=()=>{
    SetFilter((prev)=>({
        ...prev,
        limit:filter.limit+1,
    }));
  };
  const handeDecrement=()=>{
    SetFilter((prev)=>({
        ...prev,
        limit:filter.limit-1,
    }));
  };
  const handleStart=()=>{
    const params:Record<string,string>={
        specialization:String(filter.specialization),
        limit:String(filter.limit),
        complexity:String(filter.complexity),
    };
    if(filter.skills && filter.skills.length>0 ){
        params.skills=filter.skills.join(",");
    }
    const searchParams=new URLSearchParams(params);
    navigate(`/questions?${searchParams.toString()}`);
  }
  if (isSpecLoading || isSkillsLoading) {
    return (<Loading />)
  }

  return (
    <div className="Quizz">

      <div className="Quizz_container">
       
        <div className="Quizz_left">
          <span className="Quizz_header">Собеседование</span>
          
         
          <div className="Quizz_section">
            <p className="Quizz_section_title">Выбор специализации</p>
            <div className="Quizz_list">
              {specData?.data?.map((item) => (
                <button key={item.id} className={`Quizz_item ${filter.specialization==item.id? 'isActive' : ''}`} onClick={()=>handleSpec(item.id)}>
                  {item.title}
                </button>
              ))}
            </div>
          </div>

        
          <div className="Quizz_section">
            <p className="Quizz_section_title">Категории вопросов</p>
            <div className="Quizz_list">
              {skillsData?.data?.map((item) => (
                <button key={item.id} className={`Quizz_item ${filter.skills.includes(String(item.id))? 'isActive' : ''}`} onClick={()=>handeSkills(String(item.id))}>
                  {item.title}
                </button>
              ))}
            </div>
          </div>

        </div>

    
        <div className="Quizz_right">
            <div className="Quizz_section">
                <p className="Quizz_section_title">Уровень сложности</p>
                <div className="Quizz_section_container">
                  <button onClick={()=>handleComplexity('1,2,3')} className={`Quizz_item ${filter.complexity=="1,2,3"? 'isActive' : ''}`}>1-3</button>
                  <button onClick={()=>handleComplexity('4,5,6')} className={`Quizz_item ${filter.complexity=="4,5,6"? 'isActive' : ''}`}>4-6</button>
                  <button onClick={()=>handleComplexity('7,8')} className={`Quizz_item ${filter.complexity=="7,8"? 'isActive' : ''}`}>7-8</button>
                  <button onClick={()=>handleComplexity('9,10')} className={`Quizz_item ${filter.complexity=="9,10"? 'isActive' : ''}`}>9-10</button>
                </div>
          </div>

          <div className="Quizz_section">
                  <p className="Quizz_section_title">Выберите режим</p>
                  <div className="Quizz_section_container">
                  <button className={`Quizz_item ${filter.mode === 'repeat' ? 'isActive' : ''}`} onClick={() => SetFilter(prev => ({ ...prev, mode: 'repeat' }))}>Повторение</button>
                  <button className={`Quizz_item ${filter.mode === 'new' ? 'isActive' : ''}`} onClick={() => SetFilter(prev => ({ ...prev, mode: 'new' }))}>Только новые</button>
                  <button className={`Quizz_item ${filter.mode === 'random' ? 'isActive' : ''}`} onClick={() => SetFilter(prev => ({ ...prev, mode: 'random' }))}> Случайные</button>
                </div>
          </div>

          <div className="Quizz_section">
                <p className="Quizz_section_title">Количество вопросов</p>
                <div className="Quizz_questions">
                    <button onClick={()=>handeDecrement()} className="Quizz_operations"><img src='minus.svg' />
                    </button>
                    <span className="Quizz_limit">{filter.limit}</span>
                    <button onClick={()=>handeIncrement()} className="Quizz_operations"><img src='plus.svg' />
                    </button>
                </div>
          </div>
     
        </div>
      </div>
      <div className="Quizz_bottom">
        <button onClick={()=>handleStart()} className="Quizz_start"><img src="start.svg" />
        </button>
      </div>
    </div>
  );
}

export default Quizz;