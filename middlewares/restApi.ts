import {setTimeout} from "timers";
import {Middleware} from "redux";
import {TAnyAction, educationsData, experiencesData} from "@/store";
import {paginateListOf} from "@/utils";
import {PAGINATION_SIZE} from "@/actions";
import {CALL_API} from "@/constants"

const httpRequest = ({header, body}: IHttpRequestAction) =>
    new Promise<any>((resolve, reject) => {
    setTimeout(() => {
        if (typeof header === "string") {
            body ? resolve(body) : reject("undefined body")
            return
        }
        if (!("page" in header)) {
            reject("request with no pagination.")
            return
        }
        if (header.isExpTurn){
            const response = paginateListOf(experiencesData, header.page, header.size)
            const isDone = response.length <= 0 || response.length < PAGINATION_SIZE
            const experience = <IFeedState>{
                isDone,
                status: "idle",
                isExpTurn: true,
                page: header.page +1,
                value: response
            }
            resolve(experience)
            return
        }
        const response = paginateListOf(educationsData, header.page, header.size)
        const isExpTurn = response.length <= 0 || response.length < PAGINATION_SIZE
        const educations = <IFeedState>{
            isDone: false,
            status: "idle",
            isExpTurn,
            page: isExpTurn ? 1 : header.page +1,
            value: response
        }
        resolve(educations)
    }, 1500)
})
const restApiMiddleware: Middleware<IAppState> = () => (next: any) => (action: IAppAction) => {
    const callApi = action[CALL_API]
    if (typeof callApi === "undefined") return next(action)
    if (!("method" in callApi)) throw Error("Invalid call api.")

    const requestAction: IHttpRequestAction = callApi
    const [requestType, failedType, successType] = requestAction.types

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