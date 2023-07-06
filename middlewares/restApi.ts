import axios, {AxiosError, AxiosResponse} from "axios"
import {Middleware} from "redux";
import {TAnyAction} from "@/store";
import {PAGINATION_SIZE} from "@/actions/homeAction";
import {CALL_API} from "@/helpers"

const httpRequest = ({method, params, header, body, contentType}: IHttpRequestAction) => new Promise<any>(
    async (resolve, reject) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""
    const token = (typeof localStorage !== "undefined" &&
            localStorage.getItem("NEXT_PUBLIC_TOKEN")) || process.env.NEXT_PUBLIC_TOKEN || ""

        try {
        /*
        * REGULAR REQUEST
        * */
        if (typeof header === "string") {
            const url = baseUrl + header

            const headers: Record<string, any> = {
                'content-type': contentType,
                'token': token // 'cache': 'no-store'
            }
            const {data}: AxiosResponse = await axios({
                method, url, params, headers, data: body
            })
            if(method === "PUT" ||
                typeof params?.id === "undefined") {
                resolve(data)
                return
            }
            resolve(params.id)
            return
        }
        const queryParams = {
            page: header.page, size: header.size
        }
        if (!("page" in header)) {
            reject("request with no pagination.")
            return
        }
        /*experiences*/
        if (header.isExpTurn) {
            const url = baseUrl + header.endpoints[1]
            const {data}: AxiosResponse = await axios({method, url, params: queryParams})
            resolve(data)
            return
        }
        /*educations*/
        if (typeof body !== "undefined") {
            const data = body as ISchema[]
            resolve(data)
            return
        }
        const url = baseUrl + header.endpoints[0]
        const {data}: AxiosResponse = await axios({method, url, params: queryParams})
        resolve(data)

    } catch (error) {
        if (error instanceof AxiosError) {
            const message = error.response?.data?.message || error.message || JSON.stringify(error)
            console.log(message)
            reject(<TMessageResponse>{message})
            return
        }
        reject(<TMessageResponse>{message: JSON.stringify(error)})
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
            const payload = (error as TMessageResponse).message || JSON.stringify(error)
            next(actionWith(<TAnyAction>{type: failedType, payload}))
        }
    )
}
export default restApiMiddleware