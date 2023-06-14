import {AppDispatch, TAnyAction} from "@/store";
import {CALL_API} from "@/constants"

export const onSignIn = () => (dispatch: AppDispatch, getState: () => IAppState) => {
    const authentication = getState().authentication.value
    const action: IAppAction = {
        [CALL_API]: {
            method: "post",
            header: "/authentication",
            types: [
                AuthenticationAction.SIGN_IN_REQUEST,
                AuthenticationAction.SIGN_IN_FAILED,
                AuthenticationAction.SIGN_IN_SUCCESS
            ],
            body: authentication
        }
    }
    return dispatch(action)
}
export const onInputChange = (idValue: [string, any]) =>
    (dispatch: AppDispatch): IAppAction => {
        const action: TAnyAction = {
            type: AuthenticationAction.INPUT_CHANGED, payload: idValue
        }
        return dispatch(action)
    }
export const onResetSubmission = () =>
    (dispatch: AppDispatch): IAppAction => dispatch(
        <TAnyAction>{type: AuthenticationAction.RESET_SUBMISSION}
    )
export const onInputUnfocused = () =>
    (dispatch: AppDispatch): IAppAction => {
        const action: TAnyAction = {
            type: AuthenticationAction.INPUT_UNFOCUSED
        }
        return dispatch(action)
    }
export enum AuthenticationAction {
    SIGN_IN_REQUEST = "@@AUTHENTICATION_SIGN_IN_REQUEST",
    SIGN_IN_FAILED = "@@AUTHENTICATION_SIGN_IN_FAILED",
    SIGN_IN_SUCCESS = "@@AUTHENTICATION_SIGN_IN_SUCCESS",

    INPUT_CHANGED = "@@AUTHENTICATION_INPUT_CHANGED",
    INPUT_UNFOCUSED = "@@AUTHENTICATION_INPUT_UNFOCUSED",
    RESET_SUBMISSION = "@@AUTHENTICATION_RESET_SUBMISSION"
}