import {AppDispatch} from "@/store";
import {CALL_API} from "@/helpers";

export const getProfile = (initial?: ISchema) => (dispatch: AppDispatch) => {
    const action: IAppAction = {
        [CALL_API]: {
            method: "GET",
            header: "/profile",
            initialResponse: initial,
            types: [
                ProfileAction.READ_REQUEST,
                ProfileAction.READ_FAILED,
                ProfileAction.READ_SUCCESS
            ],
        }
    }
    return dispatch(action)
}
export enum ProfileAction {
    READ_REQUEST = "@@PROFILE_READ_REQUEST",
    READ_FAILED = "@@PROFILE_READ_FAILED",
    READ_SUCCESS = "@@PROFILE_READ_SUCCESS",
}