import {Reducer} from "redux";
import {EducationAction} from "../actions/educationAction";

const initialState: IEducationState = {
    status: "idle",
    isValid: false,
    images: [],
    value: {
        title: "",
        content: "",
        desc: "",
        fileUrl: "https://via.placeholder.com/150"
    }
}
const reducer: Reducer<IEducationState> =
    (state: IEducationState = initialState, action): IEducationState => {
        const isValid = typeof state.value.imageUrl !== "undefined" &&
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
                return {...state, status: "idle", images: [...state.images, action.payload]}

            case EducationAction.CREATE_REQUEST:
                return {...state, status: "loading"}

            case EducationAction.CREATE_FAILED:
                return {...state, status: "error", message: action.payload}

            case EducationAction.CREATE_SUCCESS:
                return initialState

            /*case EducationAction.READ_ALL_SUCCESS:
                return {...state, status: "idle", value: state.value.concat(action.payload)}*/
            default:
                return state
        }
    }
export default reducer