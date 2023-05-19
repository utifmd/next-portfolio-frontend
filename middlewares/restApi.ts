import {setTimeout} from "timers";
import {Middleware} from "redux";
import {TAnyAction, educationsData, experiencesData} from "../store";
import {paginateListOf} from "../utils";
import {PAGINATION_SIZE} from "../actions";

export const CALL_API = "CALL_API"

const httpRequest = ({header}: IHttpRequestAction) =>
    new Promise<ISchema[]>((resolve, reject) => {
    setTimeout(() => {
        if (!("page" in header)) {
            reject("request with no pagination.")
            return
        }
        if (header.isExpTurn){
            const response = paginateListOf(experiencesData, header.page, header.size)
            const isDone = response.length <= 0 || response.length < PAGINATION_SIZE
            const experience: IFeedState = {
                isDone,
                isExpTurn: true,
                page: header.page +1,
                value: response
            }
            resolve(experience)
            return
        }
        const response = paginateListOf(educationsData, header.page, header.size)
        const isExpTurn = response.length <= 0 || response.length < PAGINATION_SIZE
        const educations: IFeedState = {
            isDone: false,
            isExpTurn,
            page: isExpTurn ? 1 : header.page +1,
            value: response
        }
        resolve(educations)
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
            const message = ("message" in error) ? (error as Error).message : JSON.stringify(error)
            next(actionWith(<TAnyAction>{type: failedType, payload: message}))
        }
    )
}
export default restApiMiddleware