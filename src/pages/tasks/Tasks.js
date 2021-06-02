import {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

import Context from "../../context/Context";
import {TasksColumn} from "../../components";
import {addTasks, createTask, checkTask, removeTask, editTask} from '../../redux/actions/taskActions';
import "./Tasks.scss";


export const TasksPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const tasksState = useSelector(state => state.taskReducer);
    const [userId, setUserId] = useState("");

    
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("isAdmin"))) {
            axios.get(`http://localhost:8080/users/userId`, 
                    {headers: {"token": localStorage.getItem("token")}}
                )
                .then(res => {
                    if(res.status === 200) {
                        setUserId(res.data);
                        getTasksRequest(res.data);
                    }
                })
                .catch(err => {
                    console.error(err);
                    if(err.response.status === 401) {
                        history.push('/login');
                    }
                })
        } else {
            const userId = history.location.pathname.split("/")[2];

            setUserId(userId);
            getTasksRequest(userId);
        }
    }, []);
    
    
    const getTasksRequest = (userId) => {

        axios.get(`http://localhost:8080/tasks/${userId}`, {
                headers: {"token": localStorage.getItem("token")}
            })
            .then(res => {
                const {data} = res;
                const notImportantTasks = filterTasks(data, "unImportant");
                const importantTasks = filterTasks(data, "important");
                const veryImportantTasks = filterTasks(data, "veryImportant");

                dispatch(addTasks({tasks: notImportantTasks, type: "UNIMPORTANT"}));
                dispatch(addTasks({tasks: importantTasks, type: "IMPORTANT"}));
                dispatch(addTasks({tasks: veryImportantTasks, type: "VERYIMPORTANT"}));
            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 401) {
                    history.push("/login");
                }
            })
    }


    const filterTasks = (tasks, type) => {
        return tasks.filter(task => task.type === type);
    } 


    // create a new task:
    const addNewTask = (name, type) => {

        const tasksCopy = {...tasksState.tasks};
        const {unImportant, important, veryImportant} = tasksCopy;
        const allTasks = unImportant.concat(important, veryImportant);
        
        // create a task, if there are no duplicates:
        if(checkDublicates(allTasks, name)) {
            axios.post(`http://localhost:8080/tasks/${userId}`, 
                    {checked: false, name, type},
                    {headers: {"token": localStorage.getItem("token")}}
                )
                .then(res => {
                    console.log("res, _id", res, res.data._id)
                    if(res.status === 200) {

                        dispatch(createTask({type: type.toUpperCase(), payload: {_id: res.data._id, name, type, userId}}));
                    }
                })
                .catch(err => {
                    console.error(err);
                    if(err.response.status === 401) {
                        history.push("/login");
                    }
                })
                return true;
        } else {
            return false;
        }
    }


    // delete the task
    const handleRemoveTask = (id, name, type) => {
        
        axios.delete(`http://localhost:8080/tasks/${userId}/${id}`, 
                {headers: {"token": localStorage.getItem("token")}}
            )
            .then(res => {
                console.log("handleRemoveTask ", userId, name, type, id);
                dispatch(removeTask({type: type.toUpperCase(), payload: {name, type, userId, _id: id}}));
            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 401) {
                    history.push("/login");
                }
            })
    }


    const handleCheckTask = (id, type, name, checked) => {
        editTaskRequest(id, type, name, checked, userId, "check");
    }

    const handleEditTask = (id, type, name, editName, checked) => {

        // console.log('handleEditTask ', type, id, name, editName);
        const tasksCopy = {...tasksState.tasks};
        const {unImportant, important, veryImportant} = tasksCopy;
        // console.log('handleEditTask tasksCopy', tasksCopy);
        const allTasks = unImportant.concat(important, veryImportant);
        const taskIndex = allTasks.findIndex(task => {
            // console.log("task ", task, task.name, name);
            return task.name === name
        });
        // console.log('handleEditTask allTasks, taskIndex', allTasks, taskIndex);
        allTasks.splice(taskIndex, 1);

        if(checkDublicates(allTasks, editName)) {

            editTaskRequest(id, type, editName, checked, userId, "rename", name);
            return true;
        } else {
            return false;
        }
    }


    // checking for duplicates when creating/editing a task:
    const checkDublicates = (tasks, name) => {
        console.log("checkDuplicates");
        const index = tasks.findIndex(task => task.name === name);
        console.log("index ", index);
        return index === -1;
    }


    const editTaskRequest = (id, type, name, checked, userId, editType, oldName = "") => {
        axios.put(`http://localhost:8080/tasks/${userId}`,
                {id, checked, name, type},
                {headers: {"token": localStorage.getItem("token")}}
            )
            .then(res => {
                console.log("editTaskRequest");
                editType === "check" ? 
                dispatch(checkTask({type: type.toUpperCase(), payload: {name, type, checked}}))
                    :
                dispatch(editTask({type: type.toUpperCase(), payload: {editName: name, name: oldName, type}}));
            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 401) {
                    history.push("/login");
                }
            })
    }

    const contextValue = {handleCheckTask, handleRemoveTask, handleEditTask}


    return (
        
        <Context.Provider value={contextValue}>

            <div className="tasks">

                <header className="tasks-header">
                    <Link to="../login">
                        <span>Выйти</span>
                    </Link>
                    <h1>Планировщик задач</h1>
                </header>
                

                <div className="tasks-container">
                    
                    <div className="tasks-container-col">

                        <div className="tasks-container-col-unImportant">

                            <TasksColumn
                                tasks={tasksState.tasks.unImportant}
                                tasksType="unImportant"
                                addNewTask={addNewTask}

                            />
                        </div>

                        <div className="tasks-container-col-important">

                            <TasksColumn
                                tasks={tasksState.tasks.important} 
                                tasksType="important"
                                addNewTask={addNewTask}
                            />    
                        </div>

                        <div className="tasks-container-col-veryImportant">

                            <TasksColumn
                                tasks={tasksState.tasks.veryImportant}
                                tasksType="veryImportant"
                                addNewTask={addNewTask}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </Context.Provider>      
    )
}