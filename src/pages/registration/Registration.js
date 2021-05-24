import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./Registration.scss"


export const RegistrationPage = () => {
                                    // The useHistory hook gives you access to the history
    const history = useHistory();   // instance that you may use to navigate.
                                    // dynamically changing url
    const [registrationForm, setRegistrationForm] = useState({name: "", login: "", password: "", role: "admin", adminId: ""});
    const [isSelectedAdmin, setIsSelectedAdmin] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);
    const [nameLoginExists, setNameLoginExists] = useState(false);
    const [adminList, setAdminList]  = useState([]);
    const [checkPasswordValue, setCheckPasswordValue] = useState(""); // is check password input disabled

    useEffect(() => {

        axios.get("http://localhost:8080/admins")
            .then(res => {
                console.log(res);
                if(res.status === 200) {
                    setAdminList(res.data);
                    console.log(adminList.length);
                    // if there're no admins, can register an admin only 
                    if(!res.data.length) { 
                        changeFormValue("admin", "role");
                    }
                }
            })
            .catch(err => {
                console.error(err);
            })

    }, []);


    const changeFormValue = (value, fieldName) => {
        console.log("changeFormValue ", value, fieldName)
        const registrationFormCopy = {...registrationForm};
        registrationFormCopy[fieldName] = value;
        if(fieldName === "name") {
            setNameLoginExists(false);
        }
        // hide "admin"-input if "user"-role
        if(fieldName === "role") {
            if(value === "admin") {
                setIsSelectedAdmin(false);
                registrationFormCopy["adminId"] = "";
            } else {
                setIsSelectedAdmin(true);
            }
        }
        setRegistrationForm(registrationFormCopy);
    }

    // save password value after checking
    const checkPasswordsMatch = (value) => {
        setCheckPasswordValue(value);
    }

    // are all fields filled in
    const checkFormValid = () => {
        if(isPasswordError || nameLoginExists) {
            setIsFormValid(false);
            return false;
        }
        const registrationFormValues = Object.values(registrationForm);

        if(registrationForm.role === "admin") {
            registrationFormValues.pop();
            console.log("registrationFormValues ", registrationFormValues);
        }
        const validValues = registrationFormValues.every(value => value !== "");
        // validValues.role = "admin";
        setIsFormValid(validValues);
        return validValues;
    }

    // send form data to admins or users collection
    const registrateUser = (event) => {
        event.preventDefault(); // don't reload page
        if(checkFormValid()) {
            registrateRequest(`http://localhost:8080/registration/${registrationForm.role}`)
        }
    }


    const registrateRequest = (url) => {
        
        const registrationFormCopy = {...registrationForm};
        if(registrationForm.role === "admin") {
            delete registrationFormCopy.adminId;
        }
        delete registrationFormCopy.role;
        console.log("registrateRequest ", url, registrationFormCopy);
        axios.post(url, registrationFormCopy)
            .then(res => {
                if(res.status === 201) {
                    history.push("/login");
                }
            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 409) {
                    setNameLoginExists(true);
                }
            })
    }


    return (

        <div className="registrationPage">

            <form className="form" onSubmit={registrateUser}>
                
                <Link to="./login">Назад</Link>

                <h2>Регистрация</h2>

                {nameLoginExists && 
                <span style={{color: "red"}}>Пользователь с таким именем или логином уже существует</span>}

                <label htmlFor="userFirstName">Имя:</label>
                <input name="userFirstName"
                    type="text" 
                    className="form-name"
                    value={registrationForm.name}
                    onChange={(event) => changeFormValue(event.target.value, "name")}
                    placeholder="Ваше имя"
                ></input>
                
                <label>Логин:</label>
                <input type="text"
                    className="form-login"
                    value={registrationForm.login}
                    onChange={(event) => changeFormValue(event.target.value, "login")}
                    placeholder="Ваш логин"
                ></input>

                <label>Пароль:</label>
                <input type="password" 
                    className="form-password"
                    value={registrationForm.password}
                    onChange={(event) => changeFormValue(event.target.value, "password")}
                    placeholder="Ваш пароль"
                ></input>

                <label>Повторите пароль:</label>
                <input type="password"
                    className="form-password"
                    disabled={!registrationForm.password}
                    value={checkPasswordValue}
                    onChange={(event) => checkPasswordsMatch(event.target.value)}
                    onBlur={() => setIsPasswordError(checkPasswordValue !== registrationForm.password)}
                    placeholder="Введите повторно пароль"
                ></input>
                {isPasswordError && <span style={{color: "red"}}>Пароли не совпадают</span>}

                <label>Роль:</label>
                <select name="select-enter"
                    className="form-select-enter"
                    onChange={(event) => changeFormValue(event.target.value, "role")}
                >
                    {adminList.length && // cannot registrate a user if there're no admins
                    <option value="user">Пользователь</option>}

                    <option value="admin">Админ</option>
                </select>

                {isSelectedAdmin && Boolean(adminList.length) && (
                //         
                    <div className="adminSelect">
                        <label>Админ:</label>
                        <select defaultValue={'DEFAULT'} 
                            name="select-admins"
                            className="form-select-admins"
                            onChange={(event) => changeFormValue(event.target.value, "adminId")}
                        >
                            <option value="DEFAULT" disabled>Выберите админа</option>
                            {adminList.map((admin, i) => 
                                <option key={i} value={admin._id}>
                                    {admin.name + ", " + admin.login}
                                </option>                                
                            )}
                        </select>
                    </div>
                )}

                {!isFormValid && <span style={{color: "red"}}>Не все поля заполнены верно</span>}
                
                <input type="submit" 
                    className="form-btn-submit" 
                    value="Зарегистрироваться">
                </input>
            
            </form>

        </div>
    )
}