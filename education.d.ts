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
    status: "idle" | "failed" | "success",
    value: IEducation[]
}
type TDispatchEducation = (state: IEducationState) => IEducationState