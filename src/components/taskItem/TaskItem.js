import {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";

import Context from "../../context/Context";
import EditIcon from "../../img/edit-icon.png"
import DeleteIcon from "../../img/delete-icon.png"
import "./TaskItem.scss";

// export const TaskItem = ({type, task, number, classLi, onHandleMarkTask, showEditInput, onDeleteIcon, onEditIcon, newTaskName, onHandleInputChange, onHandleKeyDown}) => {
export const TaskItem = ({type, task, number, classLi}) => {

    const [editValue, setEditValue] = useState(task.name);
    const [dublicatEdit, setDublicateEdit] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const editInputEl = useRef(null);

    const {handleCheckTask, handleRemoveTask, handleEditTask} = useContext(Context);

    useEffect(() => {

        if(editMode) {
            editInputEl.current.focus();
        }
    
    }, [editMode]);


    const handleEditKeyDown = (event) => {

        if(event.key === "Enter" && event.target.value.trim() !== "" 
            && event.target.value.length < 40  
        ) {

            if(handleEditTask(type, task._id, task.name, editValue)) {

                setEditMode(false);

            } else {

                setDublicateEdit(true);
            }
        }
    }

    const handleEditInputChange = (event) => {

        //remove duplicate warning
        if(dublicatEdit) {

            setDublicateEdit(false);
        }

        setEditValue(event.target.value);
    }


    return (
        
        <>
            <li id={number} 
                className={task.checked ? "checked" : classLi}
            >

                {
                    !editMode
                        ?
                    <>
                        <input type="checkbox" 
                            id={number}
                            checked={task.checked}
                            onChange={(event) => handleCheckTask(type, task.name, event.target.checked)} 
                            // onChange={onHandleMarkTask}
                        />

                        <span className="task-item-name">{task.name}</span>

                        {
                            task.checked
                                ?
                            <img src={DeleteIcon} className="delete" alt="x" 
                                id={number}
                                onClick={() => handleRemoveTask(task._id, task.name, type)}
                            />
                                :
                            
                            <img src={EditIcon} className="edit" alt="/"
                                id={number}
                                onClick={() => setEditMode(true)}
                            />                        
                        }
                    </>

                        :

                    <>
                        <input type="text" required autoComplete="off"
                            className="task-input-edit"
                            ref={editInputEl}
                            value={editValue}
                            placeholder="Переименование задачи..."
                            onChange={handleEditInputChange}
                            onKeyDown={handleEditKeyDown} />
                        
                    </>
                }
                    
            </li>

            { 
                dublicatEdit
                    &&
                <span className="task-item-warning">Такая задача уже существует!</span>
            }

            { 
                editValue.length >= 40
                    &&
                <span className="task-item-warning">Длина не может превышать 40 символов</span>
            }
        </>
    ) 
}

TaskItem.propTypes = {
    type: PropTypes.string,
    task: PropTypes.object,
    number: PropTypes.number
};