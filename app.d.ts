interface ISchema {}

interface IHttpRequestAction {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    status: [string, string, string],
    header: string | {page: number, size: number, isExpTurn: boolean, endpoints?: string[]},
    body?: ISchema | ISchema[]
}
interface IAppAction {
    [key: string]: ISchema | ISchema[] | IHttpRequestAction
}
interface IAppState {
    education: IEducationState,
    experience: IExperienceState,
    home: IHomeState
}
interface IHomeState {
    feed: IFeedState,
    intro: {title: string, description: string},
    habit: {
        title: string,
        description: string,
        data: {icon: string, label: string}[]
    }
}
interface IFeedState {
    status: "idle" | "loading" | "error",
    message?: string,
    isExpTurn: boolean,
    isDone: boolean,
    scrollTo?: number,
    page: number,
    value: ISchema[]
}
type TBoxProps = {
    innerRef?: any,
    isLoading?: boolean,
    onNextClick?: (e: MouseEvent) => void
    onBottomClick?: (e: MouseEvent) => void,
}
type TTileProps = {
    title: string,
    description?: string
}
