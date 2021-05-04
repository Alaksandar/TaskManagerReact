const initialState = {
    unImportant: [],
    important: [],
    veryImportant: [],
}

const taskReducer = (state = initialState, action) => {

    switch(action.type) {
        case "CREATE_TASK":
            console.log("taskReducer ", action);
            const {tasksType, taskNameTrim} = action.payload;
            const stateCopy = addTask({...state}, tasksType, taskNameTrim);
            // console.log("find action type ", taskType, action);

            return stateCopy;

        default:
            return {...state};
    }
    

    
}

const addTask = (state, type, name) => {

    state[type].push({checked: false, name});

    // console.log("addTask ", state);

    return state;
}

export default taskReducer;