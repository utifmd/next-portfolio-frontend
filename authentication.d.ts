interface IAuthentication extends ISchema {
    email: string, // username: string,
    password: string
}
interface IAuthenticationState {
    value: IAuthentication,
    status: "idle" | "loading" | "error",
    message?: string,
    token?: string,
    isValid: boolean,
    isSubmitted: boolean,
}