
export const createTask = (data) => {

    // console.log("createTask ", data);

    return {
        type: "CREATE_TASK",
        payload: data
    }

}