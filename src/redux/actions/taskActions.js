export const addTasks = (data) => {

    const {tasks, type} = data;

    console.log('addTasks ', data);

    return {
        type: `ADD_NEW_TASKS_${type}`,
        payload: tasks
    }
}

export const createTask = (data) => {

    console.log('createTask ', data);

    const {name, type} = data.payload;

    return {
        type: `ADD_NEW_TASK_${data.type}`,
        payload: {name, type}
    }
}


export const editTask  = (data) => {

    console.log('editTask ', data);
    
    const {name, type, editName} = data.payload;

    return {
        type: `EDIT_TASK_${data.type}`,
        payload: {name, type, editName}
    }
} 


export const checkTask = (data) => {

    console.log("checkTask", data);

    const {name, type, checked} = data.payload;

    return {
        type: `CHECK_TASK_${data.type}`,
        payload: {name, type, checked}
    }
}


export const removeTask = (data) => {

    console.log("removeTask", data);
    const {name, type} = data.payload;

    return {
        type: `REMOVE_TASK_${data.type}`,
        payload: {name, type}
    }
} 
