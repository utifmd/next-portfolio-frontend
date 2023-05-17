interface ISchema {}

interface IHttpRequestAction {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    status: [string, string, string],
    header: string | {page: number, size: number, endpoints?: string[]}, //schema?: ISchema
    body: ISchema | ISchema[]
}
interface IAppAction {
    [key: string]: ISchema | ISchema[] | IHttpRequestAction
}
interface IAppState {
    status: "idle" | "request" | "failed" | "success",
    intro: {
        title: string, description: string
    },
    habit: {
        title: string,
        description: string,
        data: {icon: string, label: string}[]
    }
    feed: ISchema[]
}
interface IRootState {
    home: {},
    education: {},
    experience: {},
}
type TBoxProps = {
    innerRef?: any,
    onClick?: (e: MouseEvent) => void
}
type TTileProps = {
    title: string,
    description?: string,
}
type TDispatchApp = (state: IAppState) => IAppState
