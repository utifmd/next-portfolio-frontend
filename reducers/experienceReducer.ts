import {Reducer} from "redux";
import {ExperienceAction} from "@/actions/experienceAction";
import {HomeAction} from "@/actions";

const initialState: IExperienceState = {
    status: "idle",
    isValid: false,
    isSubmitted: false,
    images: [],
    value: {
        title: "",
        description: "",
        platform: "",
        type: "",
        iconUrl: "",
        demoUrl: "",
        releasedUrl: "",
        imageUrls:[],
        stack: []
    }
}
const reducer: Reducer<IExperienceState> =
    (state: IExperienceState = initialState, action): IExperienceState => {

    const isValid = state.icon && state.images.length > 0 &&
        Object.entries(state.value)
            .filter(([mKey, mValue]) => typeof mValue === "string" && mKey !== "iconUrl")
            .every(([_, mValue]) => mValue.length > 0)

    switch (action.type) {
        case HomeAction.UPDATE_FEED_EXPERIENCE_PREPARATION:
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

        case ExperienceAction.ICON_APPENDED_REQUEST:
            return {...state, status: "loading"}

        case ExperienceAction.ICON_APPENDED_FAILED:
            return {...state, status: "error", message: action.payload}

        case ExperienceAction.ICON_APPENDED_SUCCESS:
            return {...state, status: "idle", icon: action.payload}

        case ExperienceAction.IMAGES_APPENDED_REQUEST:
            return {...state, status: "loading"}

        case ExperienceAction.IMAGES_APPENDED_FAILED:
            return {...state, status: "error", message: action.payload}

        case ExperienceAction.IMAGES_APPENDED_SUCCESS:
            return {...state, status: "idle", images: [...state.images, action.payload]}

        case ExperienceAction.IMAGES_APPENDED_DESTROY: {
            const index = action.payload as number
            if (index === -1) return {...state, icon: null}

            const images = state.images.filter(
                (_, i) => i !== index
            )
            return {...state, images}
        }
        case ExperienceAction.CREATE_REQUEST:
            return {...state, status: "loading"}

        case ExperienceAction.CREATE_FAILED:
            return {...state, status: "error", message: action.payload}

        case ExperienceAction.CREATE_SUCCESS:
            return {...initialState, isSubmitted: true}

        case ExperienceAction.RESET_SUBMISSION:
            return {...state, isSubmitted: false}

        default:
            return state
    }
}
export default reducer