import {Reducer} from "redux";
import {EducationAction} from "@/actions/educationAction";
import {TAnyAction} from "@/store";

const initialState: IEducationState = {
    status: "idle",
    isValid: false,
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
        const isValid = state.image &&
            Object.values(state.value)
                .filter(mValue => typeof mValue === "string")
                .every(mValue => mValue.length >= 3)

        switch (action.type) {
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
                return initialState

            default:
                return state
        }
    }
export default reducer