interface IEducation extends ISchema {
    id: string,
    title: string,
    desc: string,
    content: string,
    imageUrl: string,
    fileUrl: string,
    createdAt: string
}
interface IEducationState {
    status: "idle" | "loading" | "error",
    value: IEducation
}
// type TDispatchEducation = (state: IEducationState) => IEducationState