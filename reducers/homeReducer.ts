import {Reducer} from "redux";
import {TAnyAction} from "@/store";
import {HomeAction, PAGINATION_SIZE} from "@/actions/homeAction";
import {EducationAction} from "@/actions/educationAction";
import {ExperienceAction} from "@/actions/experienceAction";
import {groupingListByPropKey} from "@/utils";
import {faLayerGroup, faMobilePhone, faServer, faLaptop} from "@fortawesome/free-solid-svg-icons";

const initialState: IHomeState = {
    intro: {
        title: "Who I am",
        description: "I am a self-taught generalist software engineer with strong passion to learn new things. I am familiar with a few Java, Kotlin android using android studio & Node JS frameworks as a cross mobile platform, and I also have developed backend API for a production system using native & framework. Currently I am interested and learning about Machine learning development using python. I also enjoy to play music on my spare time."
    },
    habit: {
        title: "Stuff I do",
        description: "Some of the projects we are building include android mobile application, web application, multi platform development such as react by facebook and so on, but for now we are focusing on developing android applications.",
        data: [
            {icon: faLayerGroup, label: "Frontend"},
            {icon: faServer, label: "Backend"},
            {icon: faMobilePhone, label: "Android"},
            {icon: faLaptop, label: "X-Platform"}
        ]
    },
    feed: {
        status: "idle",
        isExpTurn: false,
        isStarted: true,
        isDone: false,
        page: 0,
        value: []
    },
    profile: {
        bio: "seorang pemuda tua ophiucus",
        fullName: "utif milkedori",
        jobTitle: "software engineer",
        links: {
            email: "mailto:utifmd@gmail.com",
            github: "https://github.com/utifmd/",
            instagram: "https://instagram/@utifmd",
            linkedin: "https://linkedin.com/in/utifmd",
            medium: "https://medium.com/@utifmd",
            resume: "https://www.canva.com/design/DAEwDqEOVBQ/E4W4OrSCSwUxUQLkhApu7Q/view?utm_content=DAEwDqEOVBQ&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink",
            stackOverflow: "https://stackoverflow.com/users/6235678/utif-milkedori",
            twitter: "https://twitter.com/utifmd/"
        },
        role: "owner"
    }
}
const homeReducer: Reducer<IHomeState> =
    (state: IHomeState = initialState, action: TAnyAction): IHomeState => {
        switch (action.type) {
            case HomeAction.SET_IS_FEED_STARTED_FALSE:
                return {...state, feed:{...state.feed, isStarted: false}}

            case HomeAction.PAGED_FEED_REQUEST:
                return {...state, feed: {...state.feed, status: "loading"}}

            case HomeAction.PAGED_FEED_FAILED:
                return {...state, feed: {...state.feed, status: "error", message: action.payload}}

            case HomeAction.PAGED_FEED_SUCCESS: {
                const response = action.payload as IFeedState
                const value = [...state.feed.value, ...response.value]
                const mState: IFeedState = {...response,
                    value, scrollTo: value.length >= PAGINATION_SIZE ? value.length : undefined
                }
                return {...state, feed: {...mState, status: "idle", }}
            }
            case HomeAction.CREATE_FEED_SUCCESS:
            case EducationAction.CREATE_SUCCESS:
            case ExperienceAction.CREATE_SUCCESS: {
                const response = action.payload as ISchema
                const mState: ISchema[] = state.feed.value
                const value = [...mState, response]
                const scrollTo = "content" in response ? 0 : mState.length -1

                groupingListByPropKey(value, "content")
                return {...state, feed: {...state.feed, value, scrollTo}}
            }

            case EducationAction.DELETE_SUCCESS:
            case ExperienceAction.DELETE_SUCCESS: {
                const {id} = action.payload as ISchema
                const value = state.feed.value.filter(mValue => mValue.id !== id)
                return {...state, feed: {...state.feed, value}}
            }

            default:
                return state
        }
    }
export default homeReducer