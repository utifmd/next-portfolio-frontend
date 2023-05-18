import {setTimeout} from "timers";
import {Middleware} from "redux";
import {TAnyAction} from "../store";

export const CALL_API = "CALL_API"

const httpRequest = ({header, body}: IHttpRequestAction) =>
    new Promise<ISchema[]>((resolve, reject) => {
    setTimeout(() => {
        if (!("page" in header)) {
            reject("request with no pagination.")
            return
        }
        resolve(body)

        /*if (!("page" in header)) {
            //data = educations; resolve(data)
            reject("request with no pagination.")
            return
        }
        const {page, size} = header
        const educationData = paginateListOf(educations, page, size)

        if (!educationData.length) {
            const experienceData = paginateListOf(experiences, 1, size)
            resolve(experienceData)
            return;
        }
        resolve(educationData)*/
    }, 1500)
})
const restApiMiddleware: Middleware<TDispatchApp> = () => (next: any) => (action: IAppAction) => {
    const callApi = action[CALL_API]
    if (typeof callApi === "undefined") return next(action)
    if (!("method" in callApi)) throw Error("Invalid call api.")

    const requestAction: IHttpRequestAction = callApi
    const [requestType, failedType, successType] = requestAction.status

    const actionWith = (data: TAnyAction) => {
        const act = Object.assign({}, action, data)
        delete act[CALL_API]
        return act
    }
    next(actionWith(<TAnyAction>{type: requestType}))
    return httpRequest(requestAction).then(
        response => next(actionWith(<TAnyAction>{type: successType, payload: response})),
        error => {
            const message = ("message" in error) ? (error as Error).message : error.toString()
            next(actionWith(<TAnyAction>{type: failedType, payload: message}))
        }
    )
}
export default restApiMiddleware