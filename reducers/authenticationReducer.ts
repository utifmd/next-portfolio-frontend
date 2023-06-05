import {Reducer} from "redux";
import {TAnyAction} from "@/store";
import {AuthenticationAction} from "@/actions/authenticationAction";

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

        case AuthenticationAction.SIGN_IN_FAILED:
            return {...state, status: "error", message: action.payload as string}

        case AuthenticationAction.SIGN_IN_SUCCESS: {
            const token = new Date().getTime().toString()
            return {...state, status: "idle", value: action.payload, isSubmitted: true, token}
        }
        default:
            return state
    }
}
export default reducer