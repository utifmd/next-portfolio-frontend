import {Reducer} from "redux";
import {TAnyAction} from "@/store";
import {AuthenticationAction} from "@/actions/authenticationAction";
import {NEXT_PUBLIC_TOKEN} from "@/helpers";

const initialState: IAuthenticationState = {
    value: {
        email: "utifmd@gmail.com", password: ""
    },
    isSubmitted: false,
    isValid: false,
    status: "idle"
}
const reducer: Reducer<IAuthenticationState> =
    (state: IAuthenticationState = initialState, action: TAnyAction)=> {
    const isValid: boolean = state.value.password.length >= 8

    switch (action.type) {
        case AuthenticationAction.INPUT_CHANGED: {
            const [id, value] = action.payload as [string, any]
            return {...state, value: {...state.value, [id]: value}, isValid}
        }
        case AuthenticationAction.INPUT_UNFOCUSED:
            return {...state, isValid}

        case AuthenticationAction.RESET_SUBMISSION:
            return {...state, isSubmitted: false}

        case AuthenticationAction.SIGN_IN_REQUEST:
            return {...state, status: "loading"}

        case AuthenticationAction.AUTHENTICATE_REQUEST: {
            const token = localStorage.getItem(NEXT_PUBLIC_TOKEN) || ""
            return {...state, status: "loading", token}
        }
        case AuthenticationAction.SIGN_IN_FAILED:
        case AuthenticationAction.AUTHENTICATE_FAILED:
            return {...state,
                status: "error",
                message: action.payload as string,
                token: undefined
            }
        case AuthenticationAction.SIGN_IN_SUCCESS: {
            const {token} = action.payload as {token: string}
            localStorage.setItem(NEXT_PUBLIC_TOKEN, token)
            return {...state, status: "idle", isSubmitted: true, message: undefined, token}
        }
        case AuthenticationAction.SIGN_OUT: {
            localStorage.clear()
            return {...state, token: undefined}
        }

        case AuthenticationAction.AUTHENTICATE_SUCCESS:
            return {...state, status: "idle"}

        default:
            return state
    }
}
export default reducer