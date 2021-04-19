import {useState, useRef} from "react";

import {TaskItem} from "../taskItem/TaskItem";
import "./TasksColumn.scss"


export const TasksColumn = ({tasks, tasksType, addNewTask, markTask, deleteTask}) => { 

    const [showList, setShowList] = useState("title show");
    const [classTask, setClassTask] = useState("");
    const [taskName, setTaskName] = useState("");

    const taskNameTrim = String(taskName).trim();
    const inputEl = useRef(null);


    const handleMarkTask = (e) => {

        e.target.setAttribute("checked", e.target.checked);

        const checkedStatus = e.target.checked;
        const checkedIndex = e.target.id;


        markTask(tasksType, checkedStatus, checkedIndex);
        console.log("markTask ", tasksType, checkedStatus, checkedIndex);
    }


    const handleInputChange = (e) => {
        setTaskName(e.target.value);
    }

    const handleKeyDown = (e) => {

        if (e.key === "Enter" && taskNameTrim !== "") { // add check duplicate

            inputEl.current.blur();           
            addNewTask(taskNameTrim, tasksType);
            setTaskName("");
        }
    }


    const handleShowTaskList = (e) => {
        if(tasks.length < 1) return;

        showList === "title show" ? setClassTask("clean") : setClassTask("");
        showList === "title show" ? setShowList("title hide") : setShowList("title show");
    }


    const deleteTaskOnIcon = (e) => {
        const deleteTaskId = e.target.id;
        deleteTask(tasksType, deleteTaskId);
    }


    return (

        <>
            <h2 className={showList}
                onClick={handleShowTaskList}
            >
                {
                    tasksType === "unImportant" ? 
                    "Несрочные задачи:" :
                    tasksType === "important" ?
                    "Срочные задачи:" : "Очень срочные задачи:"
                }
            </h2>

            <ul>
                {tasks && tasks.length > 0 && tasks.map((task, index) => {

                    return (
                        <TaskItem
                            key={index}
                            task={task}
                            number={index}
                            classLi={classTask}
                            onHandleMarkTask={handleMarkTask}
                            onDeleteIcon={deleteTaskOnIcon}
                        />
                    )
                })}
            </ul>    

            <div className="tasks-container__form-container">
                
                <input type="text" required autoComplete="off"
                    placeholder="Новая задача..."
                    ref={inputEl}
                    name={tasksType} 
                    value={taskName}
                    onChange={handleInputChange} 
                    onKeyDown={handleKeyDown}
                />
                    
            </div>
        </>              
    )
    
}