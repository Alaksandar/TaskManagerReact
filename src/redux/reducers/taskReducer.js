export const initialState = {
    tasks: {
        unImportant: [],
        important: [],
        veryImportant: [],
    },

    dublicateTypeCreate: {
        unImportant: false,
        important: false, 
        veryImportant: false
    }
}

export const taskReducer = (state = initialState, action) => {

    console.log('taskReducer ', action);

    let newUnImportantTaskList;
    let newImportantTaskList;
    let newVeryImportantTaskList;

    const {type} = action; 

    switch(type) {

        case "ADD_NEW_TASK_UNIMPORTANT":
            const newUnImportantTask = {name: action.payload.name, checked: false};
            newUnImportantTaskList = state.tasks.unImportant.concat(newUnImportantTask);

            return {...state, tasks: {...state.tasks, unImportant: newUnImportantTaskList}};

        case "ADD_NEW_TASK_IMPORTANT":
            const newImportantTask = {name: action.payload.name, checked: false};
            newImportantTaskList = state.tasks.important.concat(newImportantTask);

            return {...state, tasks: {...state.tasks, important: newImportantTaskList}};    

        case "ADD_NEW_TASK_VERYIMPORTANT":
            const newVeryImportantTask = {name: action.payload.name, checked: false};
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
            return {...state, tasks: {...state.tasks, unImportant: newUnImportantTaskList}};

        case 'REMOVE_TASK_IMPORTANT': 
            newImportantTaskList = removeTask([...state.tasks.important], action.payload);   
            return {...state, tasks: {...state.tasks, important: newImportantTaskList}};

        case 'REMOVE_TASK_VERYIMPORTANT':
            newVeryImportantTaskList = removeTask([...state.tasks.veryImportant], action.payload);   
            return {...state, tasks: {...state.tasks, veryImportant: newVeryImportantTaskList}};

        
        case "CHECK_DUBLICATE_UNIMPORTANT":

            return {...state, dublicateTypeCreate: {...state.dublicateTypeCreate, unImportant: action.payload}};

        case "CHECK_DUBLICATE_IMPORTANT":

            return {...state, dublicateTypeCreate: {...state.dublicateTypeCreate, important: action.payload}};    

        case "CHECK_DUBLICATE_VERYIMPORTANT":

            return {...state, dublicateTypeCreate: {...state.dublicateTypeCreate, veryImportant: action.payload}};

        default: 
            return {...state};
    }
} 

const findTask = (tasks, payload) => {

    const taskIndex = tasks.findIndex(task => task.name === payload.name);

    return taskIndex;

}

const checkTask = (tasks, payload) => {

    const taskIndex = findTask(tasks, payload);

    tasks[taskIndex].checked = payload.checked;

    return tasks;

}

const removeTask = (tasks, payload) => {

    const taskIndex = findTask(tasks, payload);

    tasks.splice(taskIndex, 1);

    return tasks;

}
