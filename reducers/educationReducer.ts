import {Reducer} from "redux";
import {EducationAction} from "@/actions/educationAction";
import {TAnyAction} from "@/store";
import {HomeAction} from "@/actions/homeAction";
import {FileAction} from "@/actions/fileAction";

const initialState: IEducationState = {
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
            .filter(([mKey, mValue]) => typeof mValue === "string" && mKey !== "imageUrl")
            .every(([_, mValue]) => mValue.length > 0)

        const isValid: boolean = state.isSelected
            ? isTextsValid : isTextsValid && state.image

        switch (action.type) {
            case HomeAction.SELECT_FEED_EDUCATION:
                return action.payload as IEducationState

            case FileAction.DELETE_REQUEST:
            case EducationAction.IMAGE_APPENDED_REQUEST:
            case EducationAction.CREATE_REQUEST:
            case EducationAction.DELETE_REQUEST:
                return {...state, status: "loading"}

            case FileAction.DELETE_FAILED:
            case EducationAction.IMAGE_APPENDED_FAILED:
            case EducationAction.CREATE_FAILED:
            case EducationAction.DELETE_FAILED:
                return {...state, status: "error", message: action.payload}

            case EducationAction.INPUT_CHANGED: {
                const [id, value] = action.payload as [string, any]
                return {...state, value: {...state.value, [id]: value}, isValid}
            }
            case EducationAction.INPUT_UNFOCUSED:
                return {...state, isValid}

            case EducationAction.IMAGE_APPENDED_SUCCESS:
                return {...state, status: "idle", image: action.payload}

            case EducationAction.IMAGE_APPENDED_RESET:
                return {...state, image: null}

            case EducationAction.CREATE_SUCCESS:
            case EducationAction.DELETE_SUCCESS:
                return {...initialState, isSubmitted: true}

            case FileAction.DELETE_SUCCESS:
                return {...state, status: "idle", value: {...state.value}}

            case EducationAction.ADD_REMOVABLE_FILE_IDS: {
                const id = action.payload as string
                return {...state,
                    removableImageIds: state.removableImageIds?.concat(id) || [id],
                    value: {...state.value,
                        imageUrl: !state.value.imageUrl.includes(id) ? state.value.imageUrl : ""
                    }
                }
            }
            case EducationAction.RESET_SUBMISSION:
                return {...state, isSubmitted: false}

            default:
                return state
        }
    }
export default reducer