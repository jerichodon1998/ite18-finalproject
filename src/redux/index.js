import { combineReducers } from "redux";
import authReducers from "./authentication/reducers/authReducers";

const rootReducer = combineReducers({
	authReducers,
});

export default rootReducer;
