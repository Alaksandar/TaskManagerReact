import {useState} from "react";
import {TasksColumn} from "../../components";
import "./Tasks.scss";


export const TasksPage = () => {

    const [tasks, setTasks] = useState({unImportant: [], important: [], veryImportant: []})


    const onAddNewTask = (name, type) => {
        const tasksCopy = {...tasks};
        tasksCopy[type].push({checked: false, key: tasksCopy[type].length, name})
        setTasks(tasksCopy);
    }
    
    
    const onMarkTask = (type, checked, i) => {

        const tasksCopy = {...tasks};
        tasksCopy[type][i].checked = checked;
        setTasks(tasksCopy);
    }


    // delete unmarked tasks by click on delete-icon";
    const onDeleteTask = (type, id) => {

        const tasksCopy = {...tasks};
        const deleteTask = tasksCopy[type][id];

        if(deleteTask.checked) return; 

        tasksCopy[type].splice(deleteTask.key, 1);
        for (let i in tasksCopy[type]) {
            tasksCopy[type][i].key = +i;
        }
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
                            tasksType="unImportant"
                            addNewTask={onAddNewTask}
                            markTask={onMarkTask}
                            deleteTask={onDeleteTask}
                        />
                    </div>

                    <div className="tasks-container-col-important">

                        <TasksColumn
                            tasks={tasks.important}
                            tasksType="important"
                            addNewTask={onAddNewTask}
                            markTask={onMarkTask}
                            deleteTask={onDeleteTask}

                        />    
                    </div>

                    <div className="tasks-container-col-veryImportant">

                        <TasksColumn
                            tasks={tasks.veryImportant}
                            tasksType="veryImportant"
                            addNewTask={onAddNewTask}
                            markTask={onMarkTask}
                            deleteTask={onDeleteTask}

                        />
                    </div>
                </div>
            </div>

        </div>        
    )
}