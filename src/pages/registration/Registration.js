import { Link } from "react-router-dom";
import "./Registration.scss"


export const RegistrationPage = () => {

    return (

        <div className="registrationPage">

            <Link to="./">Назад</Link>

            <h1>Регистрация</h1>

            <form action="">
                <label htmlFor="userFirstName">Имя:</label>
                <input type="text" id="userFirstName" name="userFirstName" required autoComplete="off"></input>

                <label htmlFor="userSecondName">Фамилия:</label>
                <input type="text" id="userSecondName" name="userSecondName"></input>

                <label htmlFor="role">Роль:</label>
                <select name="role" id="role">
                    <option id="0" value="user"></option>
                    <option id="1" value="user1" >Пользователь</option>
                    <option id="2" value="admin">Админ</option>
                </select>

                {
                    
                        
                    <div className="adminSelect">
                    <label htmlFor="admin">Админ:</label>
                    <select name="admin" id="admin">
                        <option value="">Админ 1</option>
                        <option value="">Админ 2</option>
                    </select>
                    </div>
                }

                

                <label htmlFor="text">Логин:</label>
                <input type="text" id="login" name="login" required autoComplete="off"></input>

                <label htmlFor="password">Пароль:</label>
                <input type="password" id="password" name="password"></input>

                <label htmlFor="password_2">Повторите пароль:</label>
                <input type="password" id="password_2" name="password_2"></input>
                
                
                <input type="submit" value="Зарегистрироваться"></input>
            </form>

        </div>



            

    )
}