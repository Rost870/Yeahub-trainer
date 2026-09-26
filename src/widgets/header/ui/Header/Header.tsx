
import  './Header.css';
function Header(){
    return (
        <header className="Header">
            <div className="Header_text">
                <img src='logo.svg' />
                <span>База вопросов</span>
                <span>Тренажер</span>
                <span>Материалы</span>
                <span>Навыки</span>
            </div>
            <div className='Header_btn'>
                <button className='Header_in'>Вход</button>
                <button className='Header_reg'>Регистрация</button>
            </div>
        </header>
    );
}

export default Header;