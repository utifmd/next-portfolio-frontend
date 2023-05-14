import {combineReducers, Reducer} from "redux";
import {AppAction} from "../actions";
import educationReducer from "./educationReducer"

const appReducer: Reducer<IAppState> =
    (state: IAppState, action): IAppState => {
    switch (action.type) {
        case AppAction.READ_FEED_SUCCESS:
            return {...state, status: "success", feed: state.feed.concat(action.payload)}
        default:
            return state
    }
}
export default combineReducers({
    appReducer, educationReducer
})