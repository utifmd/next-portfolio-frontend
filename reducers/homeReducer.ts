import {Reducer} from "redux";
import {TAnyAction} from "../store";
import {AppAction, PAGINATION_SIZE} from "../actions";
import {EducationAction} from "../actions/educationAction";
import {ExperienceAction} from "../actions/experienceAction";
import {groupingListByPropKey} from "../utils";

const initialState: IHomeState = {
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
    feed: {
        status: "idle", isExpTurn: false, isDone: false, page: 1, value: []
    }
}
const homeReducer: Reducer<IHomeState> =
    (state: IHomeState = initialState, action: TAnyAction): IHomeState => {
        switch (action.type) {
            case AppAction.PAGED_FEED_REQUEST:
                return {...state, feed: {...state.feed, status: "loading"}}

            case AppAction.PAGED_FEED_FAILED:
                return {...state, feed: {...state.feed, status: "error", message: action.payload}}

            case AppAction.PAGED_FEED_SUCCESS: {
                const response = action.payload as IFeedState
                const feedValue = state.feed.value
                const feed = {...response,
                    value: feedValue.concat(response.value),
                    scrollTo: feedValue.length >= PAGINATION_SIZE && feedValue.length
                }
                return {...state, feed: {...feed, status: "idle"}}
            }

            case AppAction.CREATE_FEED_SUCCESS:
            case EducationAction.CREATE_SUCCESS:
            case ExperienceAction.CREATE_SUCCESS: {
                const mState: ISchema[] = state.feed.value
                const value = mState.concat(action.payload as ISchema)

                groupingListByPropKey(value, "content")
                return {...state, feed: {...state.feed, value, scrollTo: mState.length}}
            }

            default:
                return state
        }
    }
export default homeReducer