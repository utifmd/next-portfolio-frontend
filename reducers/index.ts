import {combineReducers, Reducer} from "redux";
import {AppAction} from "../actions";
import educationReducer from "./educationReducer"
import experienceReducer from "./experienceReducer";
import {groupingListByPropKey} from "../utils";
import {TAnyAction} from "../store";

const initialState: IAppState = {
    intro: {
        title: "Who I am",
        description: "I am a self-taught generalist software engineer with strong passion to learn new things. I am familiar with a few Java, Kotlin android using android studio & Node JS frameworks as a cross mobile platform, and I also have developed backend API for a production system using native & framework. Currently I am interested and learning about Machine learning development using python. I also enjoy to play music on my spare time."
    },
    habit: {
        title: "Stuff I do",
        description: "Some of the projects we are building include android mobile application, web application, multi platform development such as react by facebook and so on, but for now we are focusing on developing android applications.",
        data: [
            {icon: "layout", label: "Frontend"},
            {icon: "server", label: "Backend"},
            {icon: "mobile-alt", label: "Android"},
            {icon: "devices", label: "X-Platform"}
        ]
    },
    feed: [],
    status: "idle",
}
const homeReducer: Reducer<IAppState> =
    (state: IAppState = initialState, action: TAnyAction): IAppState => {
    switch (action.type) {
        case AppAction.PAGED_FEED_SUCCESS: {
            const feed: ISchema[] = state.feed.concat(action.payload)
            return {...state, status: "success", feed}
        }

        case AppAction.READ_FEED_SUCCESS: {
            return {...state, status: "success", feed: action.payload}
        }

        case AppAction.CREATE_FEED_SUCCESS:
            const feed: ISchema[] = state.feed.concat(action.payload)
            groupingListByPropKey(feed, "content")
            return {...state, status: "success", feed}

        default:
            return state
    }
}
export default combineReducers(<IRootState>{
    home: homeReducer,
    education: educationReducer,
    experience: experienceReducer,
})