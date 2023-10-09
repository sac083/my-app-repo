import { combineReducers } from "redux";
import toDoReducer from "./Todoreducer";

let rootReducer = combineReducers({toDoReducer});
export default rootReducer;