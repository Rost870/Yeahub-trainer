 import { Loading, MyError } from '@/shared/ui';
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
            totalQuestions,
            progressPercent,
            currentQuestion,
            isValidParams,
            handleTrue,
            handleFalse,
            handleFinish
        } = useQuizzProcess();

        if (isLoading) return <Loading />;
        if (isError || !isValidParams || totalQuestions === 0) return <MyError />;
        if (!currentQuestion) return <MyError />;

        return (
            <div className="Questions">
                <QuestionProgress 
                    data={data}
                    totalQuestions={totalQuestions}
                    index={index}
                    limit={limit}
                    progressPercent={progressPercent}
                />

                <div className="Questions_container">
                    <QuestionCard 
                        key={currentQuestion.id}
                        question={currentQuestion}
                        handleTrue={handleTrue}
                        handleFalse={handleFalse}
                    />

                    <button onClick={handleFinish} className="Question_end">Завершить</button>
                </div>
            </div>
        );
}


export default Questions;


