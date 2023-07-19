import {Reducer} from "redux";
import {ExperienceAction} from "@/actions/experienceAction";
import {HomeAction} from "@/actions/homeAction";
import {FileAction} from "@/actions/fileAction";
import {ImageAction} from "@/actions/imageAction";

const initialState: IExperienceState = {
    removableImageIds: [],
    status: "idle",
    isValid: false,
    isSubmitted: false,
    images: [],
    icon: null,
    value: {
        title: "",
        description: "",
        platform: "",
        type: "",
        releasedUrl: "",
        demoUrl: null,
        iconUrl: null,
        imageUrls: null,
        stack: []
    }
}
const reducer: Reducer<IExperienceState> =
    (state: IExperienceState = initialState, action): IExperienceState => {

    const isTextsValid = Object
        .entries(state.value)
        .filter(([mKey, mValue]) =>
            typeof mValue === "string" &&
            mKey !== "stack" &&
            mKey !== "demoUrl")
        .every(([_, mValue]) => mValue.length > 0)

    const isValid: boolean = state.isSelected
        ? isTextsValid && (state.value.iconUrl || state.icon)
        : isTextsValid && state.icon

    switch (action.type) {
        case ExperienceAction.IMAGES_APPENDED_REQUEST:
        case ExperienceAction.ICON_APPENDED_REQUEST:
        case ExperienceAction.CREATE_REQUEST:
        case ExperienceAction.DELETE_REQUEST:
        case ExperienceAction.UPDATE_REQUEST:
        case FileAction.DELETE_REQUEST:
        case ImageAction.DELETE_REQUEST:
            return {...state, status: "loading"}

        case ExperienceAction.IMAGES_APPENDED_FAILED:
        case ExperienceAction.ICON_APPENDED_FAILED:
        case ExperienceAction.CREATE_FAILED:
        case ExperienceAction.DELETE_FAILED:
        case ExperienceAction.UPDATE_FAILED:
        case FileAction.DELETE_FAILED:
        case ImageAction.DELETE_FAILED:
            return {...state, status: "error", message: action.payload}

        case HomeAction.SELECT_FEED_EXPERIENCE:
            return action.payload as IExperienceState

        case ExperienceAction.INPUT_CHANGED: {
            const [id, value] = action.payload as [string, any]
            return {...state, isValid, value: {...state.value, [id]: value}}
        }
        case ExperienceAction.INPUT_STACK_CREATE: {
            const stack = [...state.value.stack, action.payload as string]
            return {...state, value: {...state.value, stack}}
        }
        case ExperienceAction.INPUT_STACK_DELETE: {
            const index = action.payload as number
            const stack = state.value.stack.filter(
                (_, i) => i !== index
            )
            return {...state, value: {...state.value, stack}}
        }
        case ExperienceAction.INPUT_UNFOCUSED:
            return {...state, isValid}

        case ExperienceAction.ICON_APPENDED_SUCCESS:
            return {...state, status: "idle", icon: action.payload}

        case ExperienceAction.IMAGES_APPENDED_SUCCESS:
            return {...state, status: "idle", images: [...state.images, action.payload]}

        case ExperienceAction.IMAGES_APPENDED_RESET: {
            const index = action.payload as number
            if (index === -1) return {...state, icon: null}

            const images = state.images.filter(
                (_, i) => i !== index
            )
            return {...state, images}
        }
        case ExperienceAction.ADD_REMOVABLE_IMAGE_IDS: {
            const id = action.payload as string
            const iconUrl = !state.value.iconUrl?.includes(id) ? state.value.iconUrl : null
            const imageUrls = state.value.imageUrls?.filter(url=> !url.includes(id)) || null
            return {...state,
                removableImageIds: state.removableImageIds?.concat(id) || [id],
                value: {...state.value, imageUrls, iconUrl}
            }
        }
        case ExperienceAction.EXCLUDE_IMAGE_URL: {
            const url = action.payload as string
            const iconUrl = state.value.iconUrl !== url ? state.value.iconUrl : null
            const imageUrls = state.value.imageUrls?.filter(mUrl=> mUrl !== url) || null
            return {...state, value: {...state.value, imageUrls, iconUrl}}
        }
        case ExperienceAction.RESET_SUBMISSION:
            return {...state, isSubmitted: false}

        case ExperienceAction.CREATE_SUCCESS:
        case ExperienceAction.DELETE_SUCCESS:
        case ExperienceAction.UPDATE_SUCCESS:
            return {...initialState, isSubmitted: true}

        case FileAction.DELETE_SUCCESS:
        case ImageAction.DELETE_SUCCESS:
            return {...state, status: "idle"}

        default:
            return state
    }
}
export default reducer