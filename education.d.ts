interface IEducation extends ISchema {
    id?: string,
    title: string,
    desc: string,
    content: string,
    fileUrl: string,
    imageUrl?: string,
    createdAt?: any
}
interface IEducationState {
    status: "idle" | "loading" | "error",
    message?: string,
    isValid: boolean,
    images: any[],
    value: IEducation
}
// type TDispatchEducation = (state: IEducationState) => IEducationState