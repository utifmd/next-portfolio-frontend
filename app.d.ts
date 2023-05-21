interface ISchema {}

interface IHttpRequestAction {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    status: [string, string, string],
    header: string | {page: number, size: number, isExpTurn: boolean, endpoints?: string[]}, //schema?: ISchema
    // body: ISchema | ISchema[]
}
interface IAppAction {
    [key: string]: ISchema | ISchema[] | IHttpRequestAction
}
interface IAppState {
    status: "idle" | "loading" | "error",
    message?: string,
    feed: IFeedState,
    intro: {title: string, description: string},
    habit: {
        title: string,
        description: string,
        data: {icon: string, label: string}[]
    }
}
interface IRootState {
    home: IAppState,
    education: {},
    experience: {},
}
interface IFeedState {
    isExpTurn: boolean,
    isDone: boolean,
    scrollTo?: number,
    page: number,
    value: ISchema[]
}
type TBoxProps = {
    innerRef?: any,
    isLoading?: boolean,
    isBottom?: boolean,
    onClick?: (e: MouseEvent) => void
}
type TTileProps = {
    title: string,
    description?: string
}
type TDispatchApp = (state: IAppState) => IAppState
