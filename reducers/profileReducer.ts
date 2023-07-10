import {Reducer} from "redux";
import {TAnyAction} from "@/store";
import {ProfileAction} from "@/actions/profileAction";

const initialState: IProfileState = {
    image: undefined,
    isSelected: false,
    isSubmitted: false,
    isValid: false,
    message: "",
    removableImageUrls: [],
    status: "idle",
    value: undefined
}
const reducer: Reducer<IProfileState> = (
    state: IProfileState = initialState, action: TAnyAction): IProfileState => {

    switch (action.type) {
        case ProfileAction.READ_REQUEST:
            return {...state, status: "loading"}

        case ProfileAction.READ_FAILED:
            return {...state, status: "error", message: action.payload}

        case ProfileAction.READ_SUCCESS: {
            const value = action.payload as IProfile
            return <IProfileState>{...state, status: "idle", value}
        }
        default:
            return state
    }
}
export default reducer