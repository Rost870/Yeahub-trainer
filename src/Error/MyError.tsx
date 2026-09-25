import { Link } from "react-router-dom";
import './MyError.css'


function MyError(){
    return(
        <div className="Error">
            
            <div className="Error_container">
                <p className="Error_text"> Вопросы не найдены, попробуйте еще раз!</p>
                <Link to='/' className="Error_link">Назад</Link>
            </div>
            
        </div>
    )
}

export default MyError;