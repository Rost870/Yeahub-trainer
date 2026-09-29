import { Loading, MyError } from "@/shared/ui";
import { useQuizzFilters } from "../model/useQuizzFilters";
import { QuizzFilters } from "./QuizzFilters/QuizzFilters";
import './QuizzPage.css';

function Quizz() {
  const filtersData = useQuizzFilters();
  if(filtersData.isError){return <MyError />}
  if (filtersData.isSpecLoading || filtersData.isSkillsLoading) {
    return <Loading />;
  }

  return (
    <QuizzFilters {...filtersData} />
  );
}

export default Quizz;