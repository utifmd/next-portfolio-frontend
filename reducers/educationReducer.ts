import {Reducer} from "redux";
import {EducationAction} from "@/actions/educationAction";
import {TAnyAction} from "@/store";
import {HomeAction} from "@/actions/homeAction";
import {FileAction} from "@/actions/fileAction";
import {ImageAction} from "@/actions/imageAction";

const initialState: IEducationState = {
    removableImageUrls: [],
    status: "idle",
    isValid: false,
    isSubmitted: false,
    value: {
        title: "",
        content: "",
        desc: "",
        imageUrl: "",
        fileUrl: ""
    }
}
const reducer: Reducer<IEducationState> =
    (state: IEducationState = initialState, action: TAnyAction): IEducationState => {

        const isTextsValid = Object
            .entries(state.value)
            .filter(([mKey, mValue]) =>
                typeof mValue === "string" &&
                mKey !== "imageUrl")
            .every(([_, mValue]) => mValue.length > 0)

        const isValid: boolean = state.isSelected
            ? isTextsValid && (typeof state.image !== "undefined" || state.value.imageUrl.length > 0)
            : isTextsValid && typeof state.image !== "undefined"

        switch (action.type) {
            case FileAction.DELETE_REQUEST:
            case ImageAction.DELETE_REQUEST:
            case EducationAction.IMAGE_APPENDED_REQUEST:
            case EducationAction.CREATE_REQUEST:
            case EducationAction.DELETE_REQUEST:
            case EducationAction.UPDATE_REQUEST:
                return {...state, status: "loading"}

            case FileAction.DELETE_FAILED:
            case ImageAction.DELETE_FAILED:
            case EducationAction.IMAGE_APPENDED_FAILED:
            case EducationAction.CREATE_FAILED:
            case EducationAction.DELETE_FAILED:
            case EducationAction.UPDATE_FAILED:
                return {...state, status: "error", message: action.payload}

            case HomeAction.SELECT_FEED_EDUCATION:
                return action.payload as IEducationState

            case EducationAction.INPUT_CHANGED: {
                const [id, value] = action.payload as [string, any]
                return {...state, value: {...state.value, [id]: value}, isValid}
            }
            case EducationAction.INPUT_UNFOCUSED:
                return {...state, isValid}

            case EducationAction.IMAGE_APPENDED_SUCCESS:
                return {...state, status: "idle", image: action.payload}

            case EducationAction.IMAGE_APPENDED_RESET:
                return {...state, image: undefined}

            case EducationAction.ADD_REMOVABLE_IMAGE_URLS: {
                const url = action.payload as string
                return {...state,
                    removableImageUrls: [...state.removableImageUrls, url],
                    value: {...state.value,
                        imageUrl: state.value.imageUrl !== url ? state.value.imageUrl : ""
                    }
                }
            }
            case EducationAction.EXCLUDE_IMAGE_URL: {
                const url = action.payload as string
                const imageUrl = state.value.imageUrl !== url ? state.value.imageUrl : ""
                return {...state, value: {...state.value, imageUrl}}
            }
            case EducationAction.RESET_SUBMISSION:
                return {...state, isSubmitted: false}

            case FileAction.DELETE_SUCCESS:
            case ImageAction.DELETE_SUCCESS:
                return {...state, status: "idle"}

            case EducationAction.CREATE_SUCCESS:
            case EducationAction.DELETE_SUCCESS:
            case EducationAction.UPDATE_SUCCESS:
                return {...initialState, isSubmitted: true}

            default:
                return state
        }
    }
export default reducer