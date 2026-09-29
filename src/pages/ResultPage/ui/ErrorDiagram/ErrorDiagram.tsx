import { Link } from "react-router-dom";
import './ErrorDiagram.css';

export function ErrorDiagram() {
    return (
        <div className="Error">
            <div className="Error_container">
                <p className="Error_text">Прохождение недоступно!</p>
                <Link to='/' className="Error_link">Назад</Link>
            </div>
        </div>
    );
}

export default ErrorDiagram;
