import {Reducer} from "redux";
import {AppAction, PAGINATION_SIZE} from "../actions";
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
    feed: {
        isExpTurn: false, isDone: false, page: 1, value: []
    },
    status: "idle",
}
const homeReducer: Reducer<IAppState> =
    (state: IAppState = initialState, action: TAnyAction): IAppState => {
    switch (action.type) {
        case AppAction.PAGED_FEED_REQUEST:
            return {...state, status: "loading"}

        case AppAction.PAGED_FEED_FAILED:
            return {...state, status: "error", message: action.payload}

        case AppAction.PAGED_FEED_SUCCESS: {
            const response = action.payload as IFeedState
            const feedValue = state.feed.value
            const feed = {...response,
                value: feedValue.concat(response.value),
                scrollTo: feedValue.length >= PAGINATION_SIZE && feedValue.length
            }
            return {...state, status: "idle", feed}
        }

        case AppAction.CREATE_FEED_SUCCESS: {
            const item = action.payload as IFeedState
            const feed = {...state.feed, feed: state.feed.value.concat(item)}
            groupingListByPropKey(feed, "content")
            return {...state, feed}
        }

        case AppAction.READ_FEED_SUCCESS: {
            const feed = {...state.feed, feed: action.payload as IFeedState}
            return {...state, feed}
        }

        default:
            return state
    }
}
export default homeReducer