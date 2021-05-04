import { combineReducers } from "redux";

import taskReducer from "./taskReducer";

const coreReducer = combineReducers({taskReducer});

export default coreReducer;