 import { Loading, MyError } from '@/shared/ui';
import { Link } from 'react-router-dom';
import { QuestionProgress } from './QuestionsProgress/QuestionsProgress'; 
import { useQuizzProcess } from '../model/useQuizzProcess';
import { QuestionCard } from '@/entities/quiz';
import './QuestionsPage.css';
    
function Questions() {
        const {
            data,
            isLoading,
            isError,
            index,
            limit,
            progressPercent,
            specialization,
            location,
            handleTrue,
            handleFalse,
        } = useQuizzProcess();

        if (isLoading) return <Loading />;
        if (isError || data?.questions?.length === 0 || specialization === 0) return <MyError />;

        return (
            <div className="Questions">
               
                <QuestionProgress 
                    data={data}
                    index={index}
                    limit={limit}
                    progressPercent={progressPercent}
                />

                <div className="Questions_container">
                
                    <QuestionCard 
    			data={data}
    			index={index}
    			handleTrue={handleTrue}
    			handleFalse={handleFalse}
                    />

                    <Link to={`/done${location.search}`} className="Question_end">Завершить</Link>
                </div>
            </div>
        );
}


export default Questions;


