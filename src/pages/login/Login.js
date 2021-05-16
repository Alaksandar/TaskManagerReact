import { Link } from "react-router-dom";
import "./Login.scss";


export const LoginPage = () => {

    return (

        <div className="loginPage">

            <h1>Вход</h1>

            <form>
                <label htmlFor="text">Логин:</label>
                <input type="text" id="login" name="login" required autoComplete="off"></input>

                <label htmlFor="password">Пароль:</label>
                <input type="password" id="password" name="password"></input>
                
                <input type="submit" value="Войти"></input>
            </form>

            <Link to="./registration">
                <span>Зарегистрироваться</span>
            </Link>

        </div>
    )
}