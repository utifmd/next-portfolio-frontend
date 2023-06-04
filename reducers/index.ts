import {combineReducers} from "redux";
import homeReducer from "./homeReducer"
import educationReducer from "./educationReducer"
import experienceReducer from "./experienceReducer"
import authenticationReducer from "./authenticationReducer";

export default combineReducers({
    authentication: authenticationReducer,
    education: educationReducer,
    experience: experienceReducer,
    home: homeReducer
})