import {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import "./Login.scss";


export const LoginPage = () => {

    const history = useHistory();

    const [loginForm, setLoginForm] = useState({login: "", password: ""});
    const [isFormValid, setIsFormValid] = useState(true);

    const changeFormValue = (value, fieldName) => {
        const loginFormCopy = {...loginForm};
        loginFormCopy[fieldName] = value;
        setLoginForm(loginFormCopy);
    }


    const loginUser = (event) => {
        event.preventDefault();
        console.log("loginUser ", loginForm);
        if(checkFormValid()) {
            console.log("form is valid");
            loginRequest();
        }
    }


    const loginRequest = () => {
        axios.post("http://localhost:8080/login", loginForm)
            .then(res => {
                const {token, isAdmin} = res.data;
                localStorage.setItem("token", token);
                localStorage.setItem("isAdmin", isAdmin);
                console.log("token, isAdmin ", token, isAdmin);

                console.log("isAdmin ", isAdmin);
                isAdmin ? history.push("/users") : history.push("/tasks");
            })
            .catch(err => {
                console.log(err);
                if(err.response.status === 401) {
                    setIsFormValid(false);
                }
            })
    }


    const checkFormValid = () => {
        const loginFormValues = Object.values(loginForm);
        const validValues = loginFormValues.every(value => value !== ""); 
        setIsFormValid(validValues);
        return validValues;
    }


    return (

        <div className="loginPage">

            <h1>Вход</h1>

            <form className="form" onSubmit={loginUser}>

                <label>Логин:</label>
                <input type="text" 
                    className="form-login"
                    value={loginForm.login}
                    onChange={(event) => changeFormValue(event.target.value, "login")}
                    placeholder="Введите логин"
                ></input>

                <label>Пароль:</label>
                <input type="password"
                    className="form-password"
                    value={loginForm.password}
                    onChange={(event) => changeFormValue(event.target.value, "password")}
                    placeholder="Введите пароль"
                ></input>
                
                {!isFormValid && <span style={{color: "red"}}>Логин или пароль введены неверно</span>}

                <input type="submit" value="Войти"></input>
            </form>

            <Link to="./registration">
                <span>Зарегистрироваться{" "}</span>
            </Link>

        </div>
    )
}