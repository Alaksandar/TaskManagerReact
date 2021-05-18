// import { link } from "react-router-dom";
import "./Users.scss";


export const UsersPage = () => {

    return (

        <div className="UsersPage">

            <h1>Пользователи</h1>

            <input type="text" name="findUser" 
                placeholder="Поиск..."
                required autoComplete="off"></input>



            {/* <Link to="./"></Link> */}

        </div>
    )
}