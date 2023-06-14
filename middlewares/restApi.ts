import axios, {AxiosResponse} from "axios"
import {Middleware} from "redux";
import {TAnyAction} from "@/store";
import {PAGINATION_SIZE} from "@/actions/homeAction";
import {CALL_API} from "@/constants"

const httpRequest = ({method, header, body}: IHttpRequestAction) =>
    new Promise<any>(async (resolve, reject) => {
    if (typeof header === "string") {
        body ? resolve(body) : reject("undefined body")
        return
    }
    if (!("page" in header)) {
        reject("request with no pagination.")
        return
    }
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        // const headers = {'cache': 'no-store'}
        const params = {page: header.page, size: header.size}
        if (header.isExpTurn) {
            const url = baseUrl + header.endpoints[1]
            const response: AxiosResponse = await axios({method, url, params})
            const isDone = response.data.length <= 0 || response.data.length < PAGINATION_SIZE
            const experience = <IFeedState>{
                isDone,
                status: "idle",
                isExpTurn: true,
                page: header.page + 1,
                value: response.data
            }
            resolve(experience)
            return
        }
        const url = baseUrl + header.endpoints[0]
        const response: AxiosResponse = await axios({method, url, params})
        if (response.status != 200) {
            reject(response.statusText)
            return
        }
        const isExpTurn = response.data.length <= 0 || response.data.length < PAGINATION_SIZE
        const educations = <IFeedState> {
            isDone: false,
            status: "idle",
            isExpTurn,
            page: isExpTurn ? 1 : header.page +1,
            value: response.data
        }
        resolve(educations)

    } catch (e) {
        reject(e)
    }
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