import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Questions from "./pages/QuestionsPage/ui/QuestionsPage"
import Result from "./Result/Result";
import Quizz from "./pages/QuizzPage/ui/QuizzPage";

export const router=createBrowserRouter([
    {path:'/',
        element:<App />,
        children:[
            { index: true, element: <Quizz /> }, 
            {path:'/questions',
                element:<Questions />
            },
            {path:'/done',
                element:<Result />
            }
        ]
}]);