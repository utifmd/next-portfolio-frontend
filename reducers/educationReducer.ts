import {Reducer} from "redux";
import {EducationAction} from "../actions/educationAction";

const initialState: IEducationState = {
    status: "idle", value: []
}
const reducer: Reducer<IEducationState> =
    (state: IEducationState = initialState, action): IEducationState => {
    switch (action.type) {
        case EducationAction.READ_ALL_SUCCESS:
            return {...state, value: action.payload}
        default:
            return state
    }
}
export default reducer