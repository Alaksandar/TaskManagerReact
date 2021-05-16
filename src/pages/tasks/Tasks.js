import {useDispatch, useSelector} from 'react-redux';

import Context from '../../context/Context';
import {TasksColumn} from "../../components";
import {addTasks, createTask, checkTask, removeTask, editTask, checkDublicateTask} from '../../redux/actions/taskActions';
import "./Tasks.scss";


export const TasksPage = () => {

    const dispatch = useDispatch();

    const tasksState = useSelector(state => state.taskReducer);

    // create a new task:
    const addNewTask = (name, type) => {

        console.log('addNewTask');

        const tasksCopy = {...tasksState.tasks};

        const {unImportant, important, veryImportant} = tasksCopy;
        
        // create a task, if there are no duplicates:
        if(!checkDuplicates(unImportant.concat(important, veryImportant), name)) {

            console.log("no duplicates");

            dispatch(createTask({type: type.toUpperCase(), payload: {name, type}}));

            return true;

        // highlight a duplicate message:
        } else {

            console.log("duplicate has found");

            dispatch(checkDublicateTask({type: type.toUpperCase(), payload: true}));

            return false;
        }
    }

    const handleCheckTask = (type, name, checked) => {

        dispatch(checkTask({type: type.toUpperCase(), payload: {name, type, checked}}));
    }

    const handleRemoveTask = (type, name) => {

        dispatch(removeTask({type: type.toUpperCase(), payload: {name, type}}));

    }

    const handleEditTask = (type, number) => {

        console.log('editTask ', type, number);

    }


    // checking for duplicates when creating/editing a task:
    const checkDuplicates = (tasks, name) => {

        console.log("checkDuplicates");

        const index = tasks.findIndex(task => task.name === name);

        console.log("index ", index);
        return index !== -1;
    }

    // remove duplicate warning at an input-text focusing:
    const resetDuplicateType = (type) => {

        console.log("resetDuplicateType");

        dispatch(checkDublicateTask({type: type.toUpperCase(), payload: false}));
    }

    
    // // mark a task:
    // const markTask = (type, checked, i) => {
    //     const tasksCopy = {...tasks};
    //     tasksCopy[type][i].checked = checked;
    //     setTasks(tasksCopy);
    // }

    // // delete unmarked task by click on delete-icon":
    // const deleteTask = (type, id) => {
    //     const tasksCopy = {...tasks};
    //     const deleteTask = tasksCopy[type][id];
    //     if(!deleteTask.checked) return; 
    //     tasksCopy[type].splice(deleteTask.key, 1);
    //     for (let i in tasksCopy[type]) {
    //         tasksCopy[type][i].key = +i;
    //     }
    //     setTasks(tasksCopy);
    // }

    // const editTask = (type, id, name) => {
    //     const tasksCopy = {...tasks};
    //     const taskEdit = tasksCopy[type][id];
    //     if(!taskEdit.checked) {
    //         console.log("editTask ", taskEdit.name, name);
    //         name = taskEdit.name
    //         setTasks(tasksCopy);
    //         // return taskEdit;
    //     } 
    //     setTasks(tasksCopy);
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
                                dublicateTypeCreate={tasksState.dublicateTypeCreate.unImportant} 
                                tasks={tasksState.tasks.unImportant}
                                resetDuplicateType={resetDuplicateType}
                                tasksType="unImportant"
                                addNewTask={addNewTask}
                                // markTask={markTask}
                                // deleteTask={deleteTask}
                                // editTask={editTask}
                            />
                        </div>

                        <div className="tasks-container-col-important">

                            <TasksColumn
                                dublicateTypeCreate={tasksState.dublicateTypeCreate.important}
                                tasks={tasksState.tasks.important} 
                                resetDuplicateType={resetDuplicateType}
                                tasksType="important"
                                addNewTask={addNewTask}
                                // markTask={markTask}
                                // deleteTask={deleteTask}
                                // editTask={editTask}
                            />    
                        </div>

                        <div className="tasks-container-col-veryImportant">

                            <TasksColumn
                                dublicateTypeCreate={tasksState.dublicateTypeCreate.veryImportant} 
                                tasks={tasksState.tasks.veryImportant}
                                resetDuplicateType={resetDuplicateType}
                                tasksType="veryImportant"
                                addNewTask={addNewTask}
                                // markTask={markTask}
                                // deleteTask={deleteTask}
                                // editTask={editTask}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </Context.Provider>      
    )
}