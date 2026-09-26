import Questions from "@/pages/QuestionsPage/ui/QuestionsPage";
import Quizz from "@/pages/QuizzPage/ui/QuizzPage";
import Result from "@/pages/ResultPage/ui/ResultPage";
import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";

export const router=createBrowserRouter([
    {path:'/',
        element:<BaseLayout />,
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