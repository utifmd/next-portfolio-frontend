import {AppDispatch, TAnyAction} from "@/store";
import {CALL_API, NEXT_PUBLIC_TOKEN} from "@/helpers"

export const signIn = () => (dispatch: AppDispatch, getState: () => IAppState) => {
    const authentication = getState().authentication.value
    const action: IAppAction = {
        [CALL_API]: {
            method: "POST",
            header: "/authentication/sign-in",
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
export const authenticate = () => (dispatch: AppDispatch) => {
    const tokenOrNull= localStorage.getItem(NEXT_PUBLIC_TOKEN)

    if (tokenOrNull === null) return dispatch(<TAnyAction>{type: ""})
    const action: IAppAction = {
        [CALL_API]: {
            method: "POST",
            header: "/authentication/authenticate",
            types: [
                AuthenticationAction.AUTHENTICATE_REQUEST,
                AuthenticationAction.AUTHENTICATE_FAILED,
                AuthenticationAction.AUTHENTICATE_SUCCESS
            ]
        }
    }
    return dispatch(action)
}
export const signOut = () => (dispatch: AppDispatch) => dispatch(
    <TAnyAction>{type: AuthenticationAction.SIGN_OUT}
)
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

    SIGN_OUT = "@@AUTHENTICATION_SIGN_OUT",

    AUTHENTICATE_REQUEST = "@@AUTHENTICATION_AUTHENTICATE_REQUEST",
    AUTHENTICATE_FAILED = "@@AUTHENTICATION_AUTHENTICATE_FAILED",
    AUTHENTICATE_SUCCESS = "@@AUTHENTICATION_AUTHENTICATE_SUCCESS",

    INPUT_CHANGED = "@@AUTHENTICATION_INPUT_CHANGED",
    INPUT_UNFOCUSED = "@@AUTHENTICATION_INPUT_UNFOCUSED",
    RESET_SUBMISSION = "@@AUTHENTICATION_RESET_SUBMISSION"
}