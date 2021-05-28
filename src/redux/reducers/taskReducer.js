export const initialState = {
    tasks: {
        unImportant: [],
        important: [],
        veryImportant: [],
    },

}

export const taskReducer = (state = initialState, action) => {

    // console.log('taskReducer ', action);

    let newUnImportantTaskList;
    let newImportantTaskList;
    let newVeryImportantTaskList;

    const {type} = action; 

    console.log("type ", type)


    switch(type) {

        case 'ADD_TASKS_UNIMPORTANT': 
            return {...state, tasks: {...state.tasks, unImportant: action.payload}};
        
        case 'ADD_TASKS_IMPORTANT': 
            return {...state, tasks: {...state.tasks, important: action.payload}};

        case 'ADD_TASKS_VERYIMPORTANT': 
            return {...state, tasks: {...state.tasks, veryImportant: action.payload}};
        
        
        case `ADD_NEW_TASK_UNIMPORTANT`:
            console.log("type ", type);
            const newUnImportantTask = {_id: action.payload._id, name: action.payload.name, type: action.payload.type, userId: action.payload.userId, checked: false};
            newUnImportantTaskList = state.tasks.unImportant.concat(newUnImportantTask);
            console.log("newUnImportantTask ", newUnImportantTask)
            return {...state, tasks: {...state.tasks, unImportant: newUnImportantTaskList}};

        case "ADD_NEW_TASK_IMPORTANT":
            console.log("type ", type);
            console.log("action.payload ", action.payload)
            const newImportantTask = {_id: action.payload._id, name: action.payload.name, userId: action.payload.userId, checked: false};
            newImportantTaskList = state.tasks.important.concat(newImportantTask);
            console.log("newImportantTask ", newImportantTask);
            console.log("newImportantTaskList ", newImportantTaskList);
            return {...state, tasks: {...state.tasks, important: newImportantTaskList}};
            

        case "ADD_NEW_TASK_VERYIMPORTANT":
            console.log("type ", type);
            const newVeryImportantTask = {_id: action.payload._id, name: action.payload.name, userId: action.payload.userId, checked: false};
            newVeryImportantTaskList = state.tasks.veryImportant.concat(newVeryImportantTask);

            return {...state, tasks: {...state.tasks, veryImportant: newVeryImportantTaskList}};


        case 'CHECK_TASK_UNIMPORTANT':
            newUnImportantTaskList = checkTask([...state.tasks.unImportant], action.payload);
            console.log('CHECK_TASK_UNIMPORTANT ', newUnImportantTaskList, action);
            return {...state, tasks: {...state.tasks, unImportant: newUnImportantTaskList}};

        case 'CHECK_TASK_IMPORTANT': 
            newImportantTaskList = checkTask([...state.tasks.important], action.payload);  
            console.log('CHECK_TASK_IMPORTANT ', newImportantTaskList, action); 
            return {...state, tasks: {...state.tasks, important: newImportantTaskList}};

        case 'CHECK_TASK_VERYIMPORTANT':
            newVeryImportantTaskList = checkTask([...state.tasks.veryImportant], action.payload); 
            console.log('CHECK_TASK_VERYIMPORTANT ', newVeryImportantTaskList, action);    
            return {...state, tasks: {...state.tasks, veryImportant: newVeryImportantTaskList}};

            
        case 'REMOVE_TASK_UNIMPORTANT':
            newUnImportantTaskList = removeTask([...state.tasks.unImportant], action.payload);   
            console.log('REMOVE_TASK_UNIMPORTANT ', newUnImportantTaskList, action);  
            return {...state, tasks: {...state.tasks, unImportant: newUnImportantTaskList}};

        case 'REMOVE_TASK_IMPORTANT': 
            newImportantTaskList = removeTask([...state.tasks.important], action.payload);   
            return {...state, tasks: {...state.tasks, important: newImportantTaskList}};

        case 'REMOVE_TASK_VERYIMPORTANT':
            newVeryImportantTaskList = removeTask([...state.tasks.veryImportant], action.payload);   
            return {...state, tasks: {...state.tasks, veryImportant: newVeryImportantTaskList}};

        
        case 'EDIT_TASK_UNIMPORTANT':
            newUnImportantTaskList = renameTask([...state.tasks.unImportant], action.payload); 
            console.log('EDIT_TASK_UNIMPORTANT ', newUnImportantTaskList, action);
            return {...state, tasks: {...state.tasks, unImportant: newUnImportantTaskList}};
            

        case 'EDIT_TASK_IMPORTANT':
            newImportantTaskList = renameTask([...state.tasks.important], action.payload); 
            return {...state, tasks: {...state.tasks, important: newImportantTaskList}};
        
        case 'EDIT_TASK_VERYIMPORTANT':
            newVeryImportantTaskList = renameTask([...state.tasks.veryImportant], action.payload); 
            return {...state, tasks: {...state.tasks, veryImportant: newVeryImportantTaskList}};

        default: 
            return {...state};
    }
} 

const findTask = (tasks, payload) => {

    const taskIndex = tasks.findIndex(task => task.name === payload.name);
    console.log("taskIndex ", taskIndex);
    return taskIndex;

}

const checkTask = (tasks, payload) => {

    const taskIndex = findTask(tasks, payload);

    tasks[taskIndex].checked = payload.checked;

    return tasks;

}

const removeTask = (tasks, payload) => {

    console.log("removeTask ", tasks, payload);
    const taskIndex = findTask(tasks, payload);

    tasks.splice(taskIndex, 1);

    return tasks;

}

const renameTask = (tasks, payload) => {

    console.log("renameTask ", tasks, payload);
    const taskIndex = findTask(tasks, payload);

    tasks[taskIndex].name = payload.editName;
    console.log("renameTask tasks[taskIndex].name", tasks[taskIndex].name);


    return tasks;

}