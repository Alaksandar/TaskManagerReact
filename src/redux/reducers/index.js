import { combineReducers } from "redux";

import {taskReducer} from "./taskReducer";

// export default combineReducers({taskReducer});

const coreReducer = combineReducers({taskReducer});
export default coreReducer;