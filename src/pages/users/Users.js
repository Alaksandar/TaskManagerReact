// import { link } from "react-router-dom";
import "./Users.scss";


export const UsersPage = () => {

    return (

        <div className="UsersPage">

            <h1>Пользователи</h1>

            <input type="text" name="findUser" 
                placeholder="Поиск..."
                required autoComplete="off"></input>

            <ul>
                <li>Иванов Иван 1</li>
                <li>Иванов Иван 2</li>
                <li>Иванов Иван 3</li>
                <li>Иванов Иван 4</li>
                <li>Иванов Иван 5</li>

            </ul>               

            {/* <Link to="./"></Link> */}

        </div>
    )
}