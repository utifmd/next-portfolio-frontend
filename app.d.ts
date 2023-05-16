interface ISchema {}

interface IHttpRequestAction {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    status: [string, string, string],
    header: string | {page: number, size: number, endpoints?: string[]}, //schema?: ISchema
}
interface IAppAction {
    [key: string]: ISchema | ISchema[] | IHttpRequestAction
}
interface IAppState {
    status: "idle" | "failed" | "success",
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
type TDispatchApp = (state: IAppState) => IAppState
