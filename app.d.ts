interface ISchema {}

interface IHttpRequestAction {
    status: [string, string, string],
    endpoint: string,
    schema?: ISchema
}
interface IAppAction {
    [key: string]: ISchema | ISchema[] | IHttpRequestAction
}
interface IAppState {
    status: "idle" | "failed" | "success",
    feed: ISchema[]
}
type TDispatchApp = (state: IAppState) => IAppState
