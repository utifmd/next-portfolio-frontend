import {Reducer} from "redux";
import {EducationAction} from "@/actions/educationAction";
import {TAnyAction} from "@/store";
import {HomeAction} from "@/actions/homeAction";

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

        const isValid: boolean = state.isSelected ? isTextsValid : isTextsValid && state.image

        switch (action.type) {
            case HomeAction.SELECT_FEED_EDUCATION:
                return action.payload as IEducationState

            case EducationAction.DELETE_REQUEST:
                return {...state, status: "loading"}

            case EducationAction.DELETE_FAILED:
                return {...state, status: "error", message: action.payload}

            case EducationAction.INPUT_CHANGED: {
                const [id, value] = action.payload as [string, any]
                return {...state, value: {...state.value, [id]: value}, isValid}
            }
            case EducationAction.INPUT_UNFOCUSED:
                return {...state, isValid}

            case EducationAction.IMAGE_APPENDED_REQUEST:
                return {...state, status: "loading"}

            case EducationAction.IMAGE_APPENDED_FAILED:
                return {...state, status: "error", message: action.payload}

            case EducationAction.IMAGE_APPENDED_SUCCESS:
                return {...state, status: "idle", image: action.payload}

            case EducationAction.DELETE_IMAGE_APPENDED:
                return {...state, image: null}

            case EducationAction.CREATE_REQUEST:
                return {...state, status: "loading"}

            case EducationAction.CREATE_FAILED:
                return {...state, status: "error", message: action.payload}

            case EducationAction.CREATE_SUCCESS:
            case EducationAction.DELETE_SUCCESS:
                return {...initialState, isSubmitted: true}

            case EducationAction.RESET_SUBMISSION:
                return {...state, isSubmitted: false}

            default:
                return state
        }
    }
export default reducer