import {Reducer} from "redux";
import {TAnyAction} from "@/store";
import {HomeAction, PAGINATION_SIZE} from "@/actions/homeAction";
import {EducationAction} from "@/actions/educationAction";
import {ExperienceAction} from "@/actions/experienceAction";
import {groupingListByPropKey} from "@/utils";
import {faLayerGroup, faMobilePhone, faServer, faLaptop} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationAction} from "@/actions/authenticationAction";
import {ProfileAction} from "@/actions/profileAction";
const initialState: IHomeState = {
    status: "idle",
    feed: {
        status: "idle",
        isExpTurn: false,
        isStarted: true,
        isDone: false,
        page: 0,
        value: []
    }
}
const homeReducer: Reducer<IHomeState> =
    (state: IHomeState = initialState, action: TAnyAction): IHomeState => {
        switch (action.type) {
            case AuthenticationAction.AUTHENTICATE_REQUEST:
            case HomeAction.READ_FEED_REQUEST:
            case ProfileAction.READ_REQUEST: {
                return {...state, status: "loading"}
            }
            case AuthenticationAction.AUTHENTICATE_SUCCESS:
            case HomeAction.READ_FEED_SUCCESS:
            case ProfileAction.READ_SUCCESS: {
                return {...state,  status: "idle", message: undefined}
            }
            case HomeAction.SET_IS_FEED_STARTED_FALSE:
                return {...state, feed:{...state.feed, isStarted: false}}

            case HomeAction.PAGED_FEED_REQUEST:
                return {...state, feed: {...state.feed, status: "loading"}}

            case HomeAction.PAGED_FEED_FAILED:
                return {...state, feed: {...state.feed, status: "error", message: action.payload}}

            case HomeAction.PAGED_FEED_SUCCESS: {
                const response = action.payload as ISchema[]
                const isRestOfResponse = response.length <= 0 || response.length < PAGINATION_SIZE
                const value: ISchema[] = [...state.feed.value, ...response]
                const isExpTurn = state.feed.value.every(sch => "content" in sch) && isRestOfResponse
                const scrollTo = value.length >= PAGINATION_SIZE ? state.feed.value.length : undefined
                const page = isExpTurn ? state.feed.page > 0 ? 0 : state.feed.page +1 : state.feed.page +1

                return {...state,
                    feed: {...state.feed,
                        scrollTo,
                        value,
                        page,
                        isExpTurn,
                        isDone: isRestOfResponse,
                        status: "idle"
                    }
                }
            }
            case HomeAction.CREATE_FEED_SUCCESS:
            case EducationAction.CREATE_SUCCESS:
            case ExperienceAction.CREATE_SUCCESS: {
                const response = action.payload as ISchema
                const mState: ISchema[] = state.feed.value
                const value = [...mState, response]
                const scrollTo = "content" in response ? 0 : mState.length

                groupingListByPropKey(value, "content")
                return {...state, feed: {...state.feed, value, scrollTo}}
            }
            case EducationAction.DELETE_SUCCESS:
            case ExperienceAction.DELETE_SUCCESS: {
                const id = action.payload as string
                const value = state.feed.value.filter(mValue => mValue.id !== id)
                return {...state, feed: {...state.feed, value}}
            }
            case EducationAction.UPDATE_SUCCESS:
            case ExperienceAction.UPDATE_SUCCESS: {
                const feedItem = action.payload as ISchema
                const value = state.feed.value.map(
                    item => item.id === feedItem.id ? feedItem : item
                )
                return {...state, feed: {...state.feed, value}}
            }
            case AuthenticationAction.AUTHENTICATE_FAILED:
            case HomeAction.READ_FEED_FAILED:
            case ProfileAction.READ_FAILED:
            case AuthenticationAction.SIGN_OUT:
                return {...state,
                    status: "error",
                    message: action.payload,
                    feed: {...state.feed, scrollTo: "profile"}
                }

            default:
                return state
        }
    }
export default homeReducer