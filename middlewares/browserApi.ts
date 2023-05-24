import {Middleware} from "redux";
import {TAnyAction} from "../store";

export const BROWSER_API = "BROWSER_API"

const browserApiMiddleware: Middleware<IAppState> = () => (next: any) => (action: IAppAction) => {
    const callApi = action[BROWSER_API]
    if (typeof callApi === "undefined") return next(action)
    if (!("api" in callApi)) throw Error("Invalid browser api.")

    const requestAction: IAPIAction = callApi
    const [requestType, failedType, successType] = requestAction.types

    const actionWith = (data: TAnyAction) => {
        const act = Object.assign({}, action, data)
        delete act[BROWSER_API]
        return act
    }
    next(actionWith(<TAnyAction>{type: requestType}))
    return requestAction.api.then(
        response => next(actionWith(<TAnyAction>{type: successType, payload: response})),
        error => {
            const message = ("message" in error) ? (error as Error).message : JSON.stringify(error)
            next(actionWith(<TAnyAction>{type: failedType, payload: message}))
        }
    )
}
export default browserApiMiddleware