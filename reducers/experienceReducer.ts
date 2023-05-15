import {AnyAction, Reducer} from "redux";
import {ExperienceAction} from "../actions/experienceAction";

const initialState: IExperienceState = {
    status: "idle", value: []
}
const reducer: Reducer<IExperienceState> =
    (state: IExperienceState = initialState, action): IExperienceState => {
    switch (action.type) {
        case ExperienceAction.READ_ALL_SUCCESS:
            return {...state, status: "success", value: state.value.concat(action.payload)}
        default:
            return state
    }
}
export default reducer