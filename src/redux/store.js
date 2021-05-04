import { createStore } from "redux";

import coreReduser from "./reducers";

export default createStore(coreReduser, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());