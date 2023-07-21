interface ISchema {id?: string}

interface IHttpRequestAction {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    contentType?: 'multipart/form-data' | 'application/json'
    params?: {[key: string]: string},
    types: [string, string, string],
    header: string | {page: number, size: number, isExpTurn: boolean, endpoints: string[]},
    initialResponse?: any,
    body?: ISchema | ISchema[] | FormData | TImageRequest | undefined
}
interface IAPIAction {
    api: Promise<any>,
    types: [request: string, failed: string, success: string]
}
interface IAppAction {
    [key: string]: ISchema | ISchema[] | IHttpRequestAction | IAPIAction
}
interface IAppState {
    authentication: IAuthenticationState,
    education: IEducationState,
    experience: IExperienceState,
    home: IHomeState
    profile: IProfileState
}
interface IHomeState {
    status: "idle" | "loading" | "error",
    message?: string,
    feed: IFeedState //, profile: IProfileState
}
interface IFeedState {
    status: "idle" | "loading" | "error",
    message?: string,
    isStarted: boolean,
    isExpTurn: boolean,
    isDone: boolean,
    scrollTo?: number | string,
    page: number,
    value: ISchema[]
}
interface IEnvLocal {
    NEXT_PUBLIC_BASE_URL: string
    NEXT_PUBLIC_TOKEN: string
}
type TBoxProps = {
    innerRef?: any,
    index?: number,
    isLoading?: boolean,
    isDisable?: boolean,
    onNextClick?: (e: any) => void
    onBottomClick?: (e: any) => void,
}
type TTileProps = {
    title: string,
    description?: string
}
type TKeyValueProps = {
    key: number,
    value: string
}
type TImageLightBox = {
    src: string, alt: string
}
type TMessageResponse = {
    message: string
}
type TImageRequest = {
    [key: string]: string | string[]
}