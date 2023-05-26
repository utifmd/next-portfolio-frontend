import {Reducer} from "redux";
import {ExperienceAction} from "@/actions/experienceAction";

const initialState: IExperienceState = {
    status: "idle",
    isValid: false,
    images: [],
    value: {
        title: "",
        description: "",
        platform: "",
        type: "",
        demoUrl: "",
        releasedUrl: "",
        stack: []
    }
}
const reducer: Reducer<IExperienceState> =
    (state: IExperienceState = initialState, action): IExperienceState => {
    const isValid = typeof state.images !== "undefined" &&
        typeof state.icon !== "undefined" &&
        Object.values(state.value)
            .filter(mValue => typeof mValue === "string" || Array.isArray(mValue))
            .every(mValue => mValue.length >= 3)

    switch (action.type) {
        case ExperienceAction.INPUT_CHANGED: {
            const [id, value] = action.payload as [string, any]
            return {...state, value: {...state.value, [id]: value}, isValid}
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

        case ExperienceAction.CREATE_REQUEST:
            return {...state, status: "loading"}

        case ExperienceAction.CREATE_FAILED:
            return {...state, status: "error", message: action.payload}

        case ExperienceAction.CREATE_SUCCESS:
            return initialState

        /*case ExperienceAction.READ_ALL_SUCCESS:
            return {...state, value: state.value.concat(action.payload)}*/
        default:
            return state
    }
}
export default reducer