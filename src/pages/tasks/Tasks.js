import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import Context from '../../context/Context';
import {TasksColumn} from "../../components";
import {addTasks, createTask, checkTask, removeTask, editTask} from '../../redux/actions/taskActions';
import "./Tasks.scss";


export const TasksPage = () => {

    const dispatch = useDispatch();

    const tasksState = useSelector(state => state.taskReducer);


    useEffect(() => {

        axios.get('http://localhost:8080/tasks')
            .then(res => {

                const {data} = res;

                const notImportantTasks = filterTasks(data, "unImportant");
                const importantTasks = filterTasks(data, "important");
                const veryImportantTasks = filterTasks(data, "veryImportant");

                dispatch(addTasks({tasks: notImportantTasks, type: 'UNIMPORTANT'}));
                dispatch(addTasks({tasks: importantTasks, type: 'IMPORTANT'}));
                dispatch(addTasks({tasks: veryImportantTasks, type: 'VERYIMPORTANT'}));


            })
            .catch(err => {
                console.error(err);
            })

    }, []);


    const filterTasks = (tasks, type) => {

        return tasks.filter(task => task.type === type);

    } 

    // create a new task:
    const addNewTask = (name, type) => {

        console.log('addNewTask');

        const tasksCopy = {...tasksState.tasks};

        const {unImportant, important, veryImportant} = tasksCopy;

        const allTasks = unImportant.concat(important, veryImportant);
        
        // create a task, if there are no duplicates:
        if(checkDublicates(allTasks, name)) {

        //     console.log("no duplicates");

            // dispatch(createTask({type: type.toUpperCase(), payload: {name, type}}));

            axios.post('http://localhost:8080/tasks', { 
                checked: false,
                name,
                type
            })
            .then(res => {

                dispatch(createTask({type: type.toUpperCase(), payload: {name, type}}));

            })
            .catch(err => {
                console.error(err);
            })

            return true;


        } else {
            // highlight a duplicate message:

            // console.log("duplicate has found");

            // dispatch(checkDublicateTask({type: type.toUpperCase(), payload: true}));

            return false;
        }
    }

    const handleCheckTask = (type, name, checked) => {

        dispatch(checkTask({type: type.toUpperCase(), payload: {name, type, checked}}));
    }

    const handleRemoveTask = (id, name, type) => {

        console.log("handleRemoveTask ", id, name, type)

        // dispatch(removeTask({type: type.toUpperCase(), payload: {name, type}}));

        axios.delete(`http://localhost:8080/tasks/${id}`)
        .then(res => {

            dispatch(removeTask({type: type.toUpperCase(), payload: {name, type}}));

        })
        .catch(err => {
            console.error(err);
        })
    }

    const handleEditTask = (type, name, editName) => {

        // console.log('editTask ', type, number);
        
        const tasksCopy = {...tasksState.tasks};
        const {unImportant, important, veryImportant} = tasksCopy;

        const allTasks = unImportant.concat(important, veryImportant);
        const taskIndex = allTasks.findIndex(task => task.name === name);

        allTasks.splice(taskIndex, 1);

        if(checkDublicates(allTasks, editName)) {
            

            dispatch(editTask({type: type.toUpperCase(), payload: {name, type, editName}}));

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

    // remove duplicate warning at an input-text focusing:
    // const resetDuplicateType = (type) => {

    //     console.log("resetDuplicateType");

    //     dispatch(checkDublicateTask({type: type.toUpperCase(), payload: false}));
    // }


    const contextValue = {handleCheckTask, handleRemoveTask, handleEditTask}


    return (
        
        <Context.Provider value={contextValue}>

            <div className="tasks">

                <header className="tasks-header">
                    <h1>Планировщик задач</h1>
                </header>
                

                <div className="tasks-container">
                    
                    <div className="tasks-container-col">

                        <div className="tasks-container-col-unImportant">

                            <TasksColumn
                                // dublicateTypeCreate={tasksState.dublicateTypeCreate.unImportant} 
                                tasks={tasksState.tasks.unImportant}
                                // resetDuplicateType={resetDuplicateType}
                                tasksType="unImportant"
                                addNewTask={addNewTask}

                            />
                        </div>

                        <div className="tasks-container-col-important">

                            <TasksColumn
                                // dublicateTypeCreate={tasksState.dublicateTypeCreate.important}
                                tasks={tasksState.tasks.important} 
                                // resetDuplicateType={resetDuplicateType}
                                tasksType="important"
                                addNewTask={addNewTask}
                            />    
                        </div>

                        <div className="tasks-container-col-veryImportant">

                            <TasksColumn
                                // dublicateTypeCreate={tasksState.dublicateTypeCreate.veryImportant} 
                                tasks={tasksState.tasks.veryImportant}
                                // resetDuplicateType={resetDuplicateType}
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