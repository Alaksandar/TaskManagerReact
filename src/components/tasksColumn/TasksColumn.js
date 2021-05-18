import PropTypes from "prop-types";
import {useState, useMemo, useRef} from "react";

import {TaskItem} from "../taskItem/TaskItem";
import "./TasksColumn.scss";


export const TasksColumn = ({tasks, tasksType, addNewTask}) => { 

    const [showList, setShowList] = useState("title show");
    const [classTask, setClassTask] = useState("");

    const [taskName, setTaskName] = useState("");
    const [dublicateAdd, setDublicateAdd] = useState(false);

    const addInputEl  = useRef(null);


    // const handleMarkTask = (e) => {

    //     const checkedStatus = e.target.checked;
    //     const checkedIndex = e.target.id;

    //     markTask(tasksType, checkedStatus, checkedIndex);
    //     console.log("markTask ", tasksType, checkedStatus, checkedIndex);
    // }


    const handleAddInputChange  = (e) => {

        //remove duplicate warning            
        if(dublicateAdd) {

            setDublicateAdd(false);
        }

        setTaskName(e.target.value);
        
    }

    const handleAddKeyDown  = (e) => {

        if (e.key === "Enter" && e.target.value.trim() !== ""  && e.target.value.length < 40) {
            
            addInputEl.current.blur();           
            
            if(addNewTask(taskName, tasksType)) {

                console.log("addNewTask ", taskName);

                setTaskName("");
            
            } else {

                setDublicateAdd(true);
            
            }
        }
    }


    const handleShowTaskList = (e) => {

        if(tasks.length < 1) return;

        showList === "title show" ? setClassTask("clean") : setClassTask("");
        showList === "title show" ? setShowList("title hide") : setShowList("title show");
    }


    const taskNameValue = useMemo(() => taskName, [taskName]);


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

                    // console.log("task ", task);

                    return (
                        <TaskItem
                            key={index}
                            type={tasksType}
                            task={task}
                            number={index}
                            classLi={classTask}
                        />
                    )
                })}
            </ul>    

            <div className="tasks-container__form-container">
                
                <input type="text" required autoComplete="off"
                    placeholder="Новая задача..."
                    ref={addInputEl}
                    name={tasksType}
                    value={taskNameValue} 
                    onChange={handleAddInputChange} 
                    onKeyDown={handleAddKeyDown}
                />

                {
                    dublicateAdd 
                        &&
                    <span className="tasks-container__form-container-warning">Такая задача уже существует!</span>
                }

                { 
                    taskName.length >= 40
                        &&
                    <span className="tasks-container__form-container-warning">Длина не может превышать 40 символов</span>
                }
                    
            </div>
        </>              
    )
    
}


TasksColumn.propTypes = {
    tasksType: PropTypes.string,
    dublicateTypeCreate: PropTypes.bool,
    tasks: PropTypes.array,
    addNewTask: PropTypes.func
};
