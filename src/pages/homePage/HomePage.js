import {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";


export const HomePage = () => {

    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8080/login`, {
            headers: {"token": localStorage.getItem("token")}
            })
            .then(res => {
            console.log("res ", res);
            if(res.status === 200) {
                const {token, isAdmin} = res.data;
                localStorage.setItem("token", token);
                localStorage.setItem("isAdmin", isAdmin);
                console.log("token, isAdmin ", token, isAdmin);
                isAdmin ? history.push("/users") : history.push("/tasks");
            }
            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 401) {
                    history.push("/login");
                }
            })
    }, []);

    return (

        <div className="loginPage">
            <h1>Home Page</h1>
        </div>
    )
}