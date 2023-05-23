import {Reducer} from "redux";
import {EducationAction} from "../actions/educationAction";

const initialState: IEducationState = {
    status: "idle", value: {
        content: "", createdAt: "", desc: "", fileUrl: "", id: "", imageUrl: "", title: "this is title"
    }
}
const reducer: Reducer<IEducationState> =
    (state: IEducationState = initialState, action): IEducationState => {
        switch (action.type) {
            case EducationAction.TEXT_INPUT_CHANGED: {
                const [key, value] = action.payload as [string, string]
                return {...state, value: {...state.value, [key]: value}}
            }
            /*case EducationAction.READ_ALL_SUCCESS:
                return {...state, status: "idle", value: state.value.concat(action.payload)}*/
            default:
                return state
        }
    }
export default reducer