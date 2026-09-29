import type { useQuizzFilters } from "../../model/useQuizzFilters";

type Props = ReturnType<typeof useQuizzFilters>;

export function QuizzFilters({
  specData,
  filter,
  canStart,
  handleSpec,
  handeSkills,
  availableSkills,
  handleComplexity,
  SetFilter,
  handeDecrement,
  handeIncrement,
  handleStart,
}: Props) {
  return (
    <div className="Quizz">
      <div className="Quizz_container">
        <div className="Quizz_left">
          <span className="Quizz_header">Собеседование</span>

          <div className="Quizz_section">
            <p className="Quizz_section_title">Выбор специализации</p>
            <div className="Quizz_list">
              {specData?.data?.map((item) => (
                <button
                  key={item.id}
                  className={`Quizz_item ${filter.specialization == item.id ? "isActive" : ""}`}
                  onClick={() => handleSpec(item.id)}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          <div className="Quizz_section">
            <p className="Quizz_section_title">Категории вопросов</p>
            <div className="Quizz_list">
              {availableSkills.length>0 ? availableSkills?.map((item) => (
                <button
                  key={item.id}
                  className={`Quizz_item ${filter.skills.includes(String(item.id)) ? "isActive" : ""}`}
                  onClick={() => handeSkills(String(item.id))}
                >
                  {item.title}
                </button>
              )) : <p className="Quizz_list_attension">Выберите специализацию, для отображения навыков!</p>}
            </div>
          </div>
        </div>

        <div className="Quizz_right">
          <div className="Quizz_section">
            <p className="Quizz_section_title">Уровень сложности</p>
            <div className="Quizz_section_container">
              <button
                onClick={() => handleComplexity("1,2,3")}
                className={`Quizz_item ${filter.complexity == "1,2,3" ? "isActive" : ""}`}
              >
                1-3
              </button>
              <button
                onClick={() => handleComplexity("4,5,6")}
                className={`Quizz_item ${filter.complexity == "4,5,6" ? "isActive" : ""}`}
              >
                4-6
              </button>
              <button
                onClick={() => handleComplexity("7,8")}
                className={`Quizz_item ${filter.complexity == "7,8" ? "isActive" : ""}`}
              >
                7-8
              </button>
              <button
                onClick={() => handleComplexity("9,10")}
                className={`Quizz_item ${filter.complexity == "9,10" ? "isActive" : ""}`}
              >
                9-10
              </button>
            </div>
          </div>

          <div className="Quizz_section">
            <p className="Quizz_section_title">Выберите режим</p>
            <div className="Quizz_section_container">
              <button
                className={`Quizz_item ${filter.mode === "repeat" ? "isActive" : ""}`}
                onClick={() => SetFilter((prev) => ({ ...prev, mode: "repeat" }))}
              >
                Повторение
              </button>
              <button
                className={`Quizz_item ${filter.mode === "new" ? "isActive" : ""}`}
                onClick={() => SetFilter((prev) => ({ ...prev, mode: "new" }))}
              >
                Только новые
              </button>
              <button
                className={`Quizz_item ${filter.mode === "random" ? "isActive" : ""}`}
                onClick={() => SetFilter((prev) => ({ ...prev, mode: "random" }))}
              >
                Случайные
              </button>
            </div>
          </div>

          <div className="Quizz_section">
            <p className="Quizz_section_title">Количество вопросов</p>
            <div className="Quizz_questions">
              <button aria-label="Уменьшить количество вопросов" onClick={() => handeDecrement()} className="Quizz_operations">
                <img src="minus.svg" alt="Минус"/>
              </button>
              <span className="Quizz_limit">{filter.limit}</span>
              <button aria-label="Увеличить количество вопросов" onClick={() => handeIncrement()} className="Quizz_operations">
                <img src="plus.svg" alt="Плюс"/>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="Quizz_bottom">
        <button aria-label="Начать собеседование" disabled={!canStart} onClick={() => handleStart()} className="Quizz_start">
          <img src="start.svg"  alt="Старт"/>
        </button>

      </div>
    </div>
  );
}