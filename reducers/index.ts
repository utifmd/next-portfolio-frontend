import {combineReducers} from "redux";
import homeReducer from "./homeReducer"
import educationReducer from "./educationReducer"
import experienceReducer from "./experienceReducer"

export default combineReducers({
    education: educationReducer,
    experience: experienceReducer,
    home: homeReducer
})