import {useState} from "react";
import {TasksColumn} from "../../components";
import "./Tasks.scss";


export const TasksPage = () => {

    const [tasks, setTasks] = useState({unImportant: [], important: [], veryImportant: []})
    const [duplicateTypeCreate, setDuplicateTypeCreate] = useState({unImportant: false}, {important: false}, {veryImportant: false});

    // const [cleanInputValue, setCleanInputValue] = useState("");

    // create a new task:
    const addNewTask = (name, type) => {

        const tasksCopy = {...tasks};
        const {unImportant, important, veryImportant} = tasksCopy;
        // let cleanInputValueCopy = {...cleanInputValue};
        
        // create a task, if there are no duplicates:
        if(!checkDuplicates(unImportant.concat(important, veryImportant), name)) {

            console.log("no duplicates");

            tasksCopy[type].push({checked: false, key: tasksCopy[type].length, name: name});
            setTasks(tasksCopy);

            // cleanInputValueCopy = "";
            // setCleanInputValue(cleanInputValueCopy);

            return true;

        // highlight a duplicate message:
        } else {

            console.log("duplicate found");

            const duplicateTypeCreateCopy = {...duplicateTypeCreate};
            duplicateTypeCreateCopy[type] = true;

            // cleanInputValueCopy = name;
            // setCleanInputValue(cleanInputValueCopy);

            setDuplicateTypeCreate(duplicateTypeCreateCopy);

            return false;
        }
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

        const duplicateTypeCreateCopy = {duplicateTypeCreate};
        console.log("resetDuplicateType ", resetDuplicateType[type]);

        duplicateTypeCreateCopy[type] = false;

        setDuplicateTypeCreate(duplicateTypeCreateCopy);
    }

    

    // mark a task:
    const markTask = (type, checked, i) => {

        const tasksCopy = {...tasks};
        tasksCopy[type][i].checked = checked;
        setTasks(tasksCopy);
    }


    // delete unmarked task by click on delete-icon":
    const deleteTask = (type, id) => {

        const tasksCopy = {...tasks};
        const deleteTask = tasksCopy[type][id];

        if(deleteTask.checked) return; 

        tasksCopy[type].splice(deleteTask.key, 1);
        for (let i in tasksCopy[type]) {
            tasksCopy[type][i].key = +i;
        }
        setTasks(tasksCopy);
    }

    
    const editTask = (type, id) => {

        const tasksCopy = {...tasks};
        const editTask = tasksCopy[type][id];

        if(editTask.checked) {

            console.log("editTask ", editTask);
        } 

        

        // tasksCopy[type].splice(editTask.key, 1);
        // for (let i in tasksCopy[type]) {
        //     tasksCopy[type][i].key = +i;
        // }
        setTasks(tasksCopy);
    }



    return (
                
        <div className="tasks">

            <header className="tasks-header">
                <h1>Планировщик задач</h1>
            </header>
            

            <div className="tasks-container">
                
                <div className="tasks-container-col">

                    <div className="tasks-container-col-unImportant">

                        <TasksColumn
                            tasks={tasks.unImportant}
        p                   dublicateTypeCreate={duplicateTypeCreate.unImportant}
                            resetDuplicateType={resetDuplicateType}
                            tasksType="unImportant"
                            addNewTask={addNewTask}
                            markTask={markTask}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            // cleanInputValue={cleanInputValue}
                        />
                    </div>

                    <div className="tasks-container-col-important">

                        <TasksColumn
                            tasks={tasks.important}
        p                   duplicateTypeCreate={duplicateTypeCreate.important}
                            resetDuplicateType={resetDuplicateType}
                            tasksType="important"
                            addNewTask={addNewTask}
                            markTask={markTask}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            // cleanInputValue={cleanInputValue}
                        />    
                    </div>

                    <div className="tasks-container-col-veryImportant">

                        <TasksColumn
                            tasks={tasks.veryImportant}
        p                   duplicateTypeCreate={duplicateTypeCreate.veryImportant}
                            resetDuplicateType={resetDuplicateType}
                            tasksType="veryImportant"
                            addNewTask={addNewTask}
                            markTask={markTask}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            // cleanInputValue={cleanInputValue}
                        />
                    </div>
                </div>
            </div>

        </div>        
    )
}