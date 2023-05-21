import {Reducer} from "redux";
import {ExperienceAction} from "../actions/experienceAction";
import {TAnyAction} from "../store";

const initialState: IExperienceState = {
    status: "idle", value: []
}
const reducer: Reducer<IExperienceState> =
    (state: IExperienceState = initialState, action: TAnyAction): IExperienceState => {
    switch (action.type) {
        case ExperienceAction.READ_ALL_SUCCESS:
            return {...state, value: state.value.concat(action.payload)}
        default:
            return state
    }
}
export default reducer