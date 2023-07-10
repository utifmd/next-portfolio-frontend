import {combineReducers} from "redux";
import homeReducer from "./homeReducer"
import educationReducer from "./educationReducer"
import experienceReducer from "./experienceReducer"
import authenticationReducer from "./authenticationReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
    authentication: authenticationReducer,
    education: educationReducer,
    experience: experienceReducer,
    home: homeReducer,
    profile: profileReducer
})