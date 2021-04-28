// import {useState} from "react";
import "./TaskItem.scss";

import EditIcon from "../../img/edit-icon.png"
import DeleteIcon from "../../img/delete-icon.png"

export const TaskItem = ({task, number, classLi, onHandleMarkTask, onDeleteIcon, onEditIcon}) => {


    return (
        <li id={number} 
            className={task.checked ? "checked" : classLi}
        >
            

            <input type="checkbox" 
                id={number}
                onChange={onHandleMarkTask}
                checked={task.checked}
            />

            <input className={"editTaskInput"} 
                type="text" required autoComplete="off"
                placeholder="Редактирование задачи..."

            />

            <label>{task.name}</label>
            <img src={EditIcon} className="edit" alt="/"
                id={number}
                onClick={onEditIcon}
            />
            <img src={DeleteIcon} className="delete" alt="x" 
                id={number}
                onClick={onDeleteIcon}
            />
        </li>
    ) 
}